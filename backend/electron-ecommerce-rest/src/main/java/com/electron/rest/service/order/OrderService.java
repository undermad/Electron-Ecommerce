package com.electron.rest.service.order;

import com.electron.rest.constants.OrderStatus;
import com.electron.rest.dto.order.OrderRequest;
import com.electron.rest.entity.orders.DeliveryAddress;
import com.electron.rest.entity.orders.Order;
import com.electron.rest.entity.orders.OrderItem;
import com.electron.rest.entity.orders.PaymentInformation;
import com.electron.rest.entity.product.ProductItem;
import com.electron.rest.entity.projections.CheckoutItemProjection;
import com.electron.rest.entity.user.User;
import com.electron.rest.entity.user.UserFactory;
import com.electron.rest.entity.user.UserIdFactory;
import com.electron.rest.exception.PaymentDeclinedException;
import com.electron.rest.exception.SessionExpiredException;
import com.electron.rest.mapper.DeliveryAddressMapper;
import com.electron.rest.mapper.PaymentInformationMapper;
import com.electron.rest.payment.PaymentResult;
import com.electron.rest.payment.PaymentStrategy;
import com.electron.rest.repository.CheckoutItemRepository;
import com.electron.rest.repository.account.BasketItemRepository;
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

@Service
public class OrderService {

    @Qualifier(UserIdFactory.BEAN_ID)
    private final UserFactory<String> userIdFactory;

    private final IdempotencyKeyService idempotencyKeyService;
    private final PaymentInformationMapper paymentInformationMapper;
    private final DeliveryAddressMapper deliveryAddressMapper;
    private final Map<String, PaymentStrategy> paymentStrategies;
    private final CheckoutItemRepository checkoutItemRepository;
    private final BasketItemRepository basketItemRepository;
    private final OrderRepository orderRepository;

    public OrderService(UserFactory<String> userIdFactory, IdempotencyKeyService idempotencyKeyService, PaymentInformationMapper paymentInformationMapper, DeliveryAddressMapper deliveryAddressMapper, Map<String, PaymentStrategy> paymentStrategies, CheckoutItemRepository checkoutItemRepository, BasketItemRepository basketItemRepository, OrderRepository orderRepository) {
        this.userIdFactory = userIdFactory;
        this.idempotencyKeyService = idempotencyKeyService;
        this.paymentInformationMapper = paymentInformationMapper;
        this.deliveryAddressMapper = deliveryAddressMapper;
        this.paymentStrategies = paymentStrategies;
        this.checkoutItemRepository = checkoutItemRepository;
        this.basketItemRepository = basketItemRepository;
        this.orderRepository = orderRepository;
    }


    @Transactional
    public PaymentResult placeOrder(OrderRequest orderRequest, String jwt) throws Exception {
        if (!idempotencyKeyService.checkAndStore(orderRequest.idempotencyKey())) return PaymentResult.PENDING;


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

        orderRepository.save(order);

        PaymentStrategy paymentStrategy = paymentStrategies.get(orderRequest.paymentType().value());
        PaymentResult paymentResult = paymentStrategy.pay(paymentAmount.get());
        if (paymentResult.equals(PaymentResult.FAILED)) throw new PaymentDeclinedException(paymentResult);
        return paymentResult;
    }


}
