package com.electron.rest.service.order;

import com.electron.rest.constants.ErrorMessages;
import com.electron.rest.constants.OrderStatus;
import com.electron.rest.dto.order.OrderRequest;
import com.electron.rest.dto.order.OrderResponse;
import com.electron.rest.email.EmailService;
import com.electron.rest.email.EmailSettings;
import com.electron.rest.email.OrderConfirmationEmailSettings;
import com.electron.rest.entity.orders.DeliveryAddress;
import com.electron.rest.entity.orders.Order;
import com.electron.rest.entity.orders.OrderItem;
import com.electron.rest.entity.orders.PaymentInformation;
import com.electron.rest.entity.product.ProductItem;
import com.electron.rest.entity.projections.CheckoutItemProjection;
import com.electron.rest.entity.projections.DeliveryAddressProjection;
import com.electron.rest.entity.projections.OrderItemProjection;
import com.electron.rest.entity.projections.OrderProjection;
import com.electron.rest.entity.user.User;
import com.electron.rest.entity.user.UserFactory;
import com.electron.rest.entity.user.UserIdFactory;
import com.electron.rest.exception.PaymentDeclinedException;
import com.electron.rest.exception.ResourceNotFoundException;
import com.electron.rest.exception.SessionExpiredException;
import com.electron.rest.mapper.DeliveryAddressMapper;
import com.electron.rest.mapper.OrderMapper;
import com.electron.rest.mapper.PaymentInformationMapper;
import com.electron.rest.payment.PaymentResult;
import com.electron.rest.payment.PaymentStrategy;
import com.electron.rest.repository.auth.UserRepository;
import com.electron.rest.repository.product.CheckoutItemRepository;
import com.electron.rest.repository.account.BasketItemRepository;
import com.electron.rest.repository.order.DeliveryAddressRepository;
import com.electron.rest.repository.order.OrderItemRepository;
import com.electron.rest.repository.order.OrderRepository;
import com.electron.rest.service.redis.IdempotencyKeyService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicReference;

import static com.electron.rest.constants.ErrorMessages.SESSION_EXPIRED;
import static com.electron.rest.constants.ErrorMessages.USER_NOT_FOUND;

@Service
public class OrderService {

    @Qualifier(UserIdFactory.BEAN_ID)
    private final UserFactory<String> userIdFactory;

    private final IdempotencyKeyService idempotencyKeyService;
    private final PaymentInformationMapper paymentInformationMapper;
    private final DeliveryAddressMapper deliveryAddressMapper;
    private final CheckoutItemRepository checkoutItemRepository;
    private final BasketItemRepository basketItemRepository;
    private final OrderRepository orderRepository;
    private final DeliveryAddressRepository deliveryAddressRepository;
    private final OrderItemRepository orderItemRepository;
    private final Map<String, PaymentStrategy> paymentStrategies;
    private final OrderMapper orderMapper;
    private final EmailService emailService;


    public OrderService(UserFactory<String> userIdFactory, IdempotencyKeyService idempotencyKeyService, PaymentInformationMapper paymentInformationMapper, DeliveryAddressMapper deliveryAddressMapper, Map<String, PaymentStrategy> paymentStrategies, CheckoutItemRepository checkoutItemRepository, BasketItemRepository basketItemRepository, OrderRepository orderRepository, DeliveryAddressRepository deliveryAddressRepository, OrderItemRepository orderItemRepository, OrderMapper orderMapper, EmailService emailService) {
        this.userIdFactory = userIdFactory;
        this.idempotencyKeyService = idempotencyKeyService;
        this.paymentInformationMapper = paymentInformationMapper;
        this.deliveryAddressMapper = deliveryAddressMapper;
        this.paymentStrategies = paymentStrategies;
        this.checkoutItemRepository = checkoutItemRepository;
        this.basketItemRepository = basketItemRepository;
        this.orderRepository = orderRepository;
        this.deliveryAddressRepository = deliveryAddressRepository;
        this.orderItemRepository = orderItemRepository;
        this.orderMapper = orderMapper;
        this.emailService = emailService;
    }


    public List<OrderResponse> getOrders(String jwt) {
        User user = userIdFactory.createUser(jwt);
        List<OrderResponse> orders = new ArrayList<>();

        List<OrderProjection> ordersProjections = orderRepository.getAll(user.getId());
        ordersProjections.forEach(orderProjection -> {
            DeliveryAddressProjection deliveryAddressProjection = deliveryAddressRepository
                    .getDeliveryAddress(orderProjection.getDeliveryAddressId())
                    .orElseThrow(() -> new ResourceNotFoundException(ErrorMessages.DELIVERY_ADDRESS_NOT_FOUND));

            List<OrderItemProjection> orderItemsProjections = orderItemRepository.getAll(orderProjection.getId());

            OrderResponse orderResponse = orderMapper.mapToOrderResponse(
                    orderProjection,
                    deliveryAddressProjection,
                    orderItemsProjections);
            orders.add(orderResponse);
        });

        return orders;
    }


    @Transactional
    public PaymentResult placeOrder(OrderRequest orderRequest, String jwt) throws Exception {
        if (!idempotencyKeyService.checkAndStore(orderRequest.idempotencyKey())) return PaymentResult.PROCESSING;


        User user = userIdFactory.createUser(jwt);
        PaymentInformation paymentInformation = paymentInformationMapper.mapDtoToPaymentInformation(orderRequest.paymentInformation());
        DeliveryAddress deliveryAddress = deliveryAddressMapper.mapDtoToDeliveryAddress(orderRequest.deliveryAddress());
        List<CheckoutItemProjection> checkoutItems = checkoutItemRepository.findCheckoutItemsByUserId(user.getId());
        if (checkoutItems.isEmpty()) throw new SessionExpiredException(SESSION_EXPIRED);

        List<OrderItem> orderItems = new ArrayList<>();
        Order order = Order.builder()
                .deliveryAddress(deliveryAddress)
                .paymentInformation(paymentInformation)
                .items(orderItems)
                .user(user)
                .status(OrderStatus.PROCESSING.getStatus())
                .build();

        AtomicReference<Double> paymentAmount = new AtomicReference<>(0D);
        AtomicReference<Integer> totalItems = new AtomicReference<>(0);
        checkoutItems.forEach(item -> {
            paymentAmount.updateAndGet(v -> (v + item.getTotalPrice().doubleValue()));
            totalItems.updateAndGet(v -> (v + item.getQuantity()));
            ProductItem productItem = new ProductItem();
            productItem.setId(item.getProductItemId());
            OrderItem orderItem = OrderItem.builder()
                    .productItem(productItem)
                    .quantity(item.getQuantity())
                    .singleUnitPrice(item.getUnitPrice())
                    .totalPrice(item.getTotalPrice())
                    .build();
            order.addItem(orderItem);
            checkoutItemRepository.remove(item.getId());
            basketItemRepository.remove(item.getBasketItemId());
        });
        order.setTotalPrice(BigDecimal.valueOf(paymentAmount.get()));
        order.setTotalItems(totalItems.get());

        Order savedOrder = orderRepository.save(order);

        PaymentStrategy paymentStrategy = paymentStrategies.get(orderRequest.paymentType().value());
        PaymentResult paymentResult = paymentStrategy.pay(paymentAmount.get());
        if (paymentResult.equals(PaymentResult.FAILED)) throw new PaymentDeclinedException(paymentResult);

        OrderConfirmationEmailSettings emailSettingsProvider = new OrderConfirmationEmailSettings();
        EmailSettings emailSettings = emailSettingsProvider.createSettings(savedOrder);
        emailService.sendThymeleafEmail(emailSettings);
        return paymentResult;
    }


}
