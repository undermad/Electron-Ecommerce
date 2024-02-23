package com.electron.rest.service.order;

import com.electron.rest.dto.order.CheckoutItemResponse;
import com.electron.rest.dto.product.ProductResponse;
import com.electron.rest.entity.account.BasketItem;
import com.electron.rest.entity.orders.CheckoutItem;
import com.electron.rest.entity.projections.BasketItemProjection;
import com.electron.rest.entity.projections.CheckoutItemProjection;
import com.electron.rest.entity.projections.ProductItemProjection;
import com.electron.rest.entity.user.User;
import com.electron.rest.entity.user.UserFactory;
import com.electron.rest.exception.OutOfStockException;
import com.electron.rest.exception.ResourceNotFoundException;
import com.electron.rest.mapper.ProductMapper;
import com.electron.rest.repository.CheckoutItemRepository;
import com.electron.rest.repository.account.BasketItemRepository;
import com.electron.rest.repository.product.ProductItemRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

import static com.electron.rest.constants.ErrorMessages.CHECKOUT_NOT_FOUND;
import static com.electron.rest.constants.ErrorMessages.PRODUCT_NOT_FOUND;

@Service
@Transactional
public class CheckoutService {

    @Qualifier("userIdFactory")
    private final UserFactory<String> userIdFactory;
    private final BasketItemRepository basketItemRepository;
    private final ProductItemRepository productItemRepository;
    private final CheckoutItemRepository checkoutItemRepository;
    private final ProductMapper productMapper;

    public CheckoutService(UserFactory<String> userIdFactory, BasketItemRepository basketItemRepository, ProductItemRepository productItemRepository, CheckoutItemRepository checkoutItemRepository, ProductMapper productMapper) {
        this.userIdFactory = userIdFactory;
        this.basketItemRepository = basketItemRepository;
        this.productItemRepository = productItemRepository;
        this.checkoutItemRepository = checkoutItemRepository;
        this.productMapper = productMapper;
    }

    public CheckoutItemResponse getCheckoutSummary(String jwt) {
        User user = userIdFactory.createUser(jwt);
        List<CheckoutItemProjection> checkoutItems = checkoutItemRepository.findCheckoutItemsByUserId(user.getId());
        if(checkoutItems.isEmpty()) throw new ResourceNotFoundException(CHECKOUT_NOT_FOUND);
        List<ProductResponse> listOfProducts = new ArrayList<>();
        AtomicReference<Double> totalPrice = new AtomicReference<>(0D);
        AtomicReference<Integer> totalItems = new AtomicReference<>(0);
        checkoutItems.forEach(item -> {
            ProductItemProjection productItemProjection = productItemRepository.findProductListItem(item.getProductItemId())
                    .orElseThrow(() -> new ResourceNotFoundException(PRODUCT_NOT_FOUND));
            ProductResponse productResponse = productMapper.mapProductItemProjectionToProductResponse(productItemProjection);
            productResponse.setTotalQuantity(item.getQuantity());
            listOfProducts.add(productResponse);
            totalPrice.updateAndGet(v -> v + item.getTotalPrice().doubleValue());
            totalItems.updateAndGet(v -> (int) (v + item.getQuantity().doubleValue()));
        });

        return new CheckoutItemResponse(
                listOfProducts,
                totalPrice.get(),
                totalItems.get());
    }

    public void deleteCheckout(String jwt) {
        User user = userIdFactory.createUser(jwt);
        List<CheckoutItemProjection> items = checkoutItemRepository.findCheckoutItemsByUserId(user.getId());
        items.forEach(item -> {
            productItemRepository.increaseQuantity(item.getQuantity(), item.getProductItemId());
        });
        checkoutItemRepository.deleteAllUserItems(user.getId());
    }

    public void startCheckout(String jwt) {
        User user = userIdFactory.createUser(jwt);

        List<BasketItemProjection> basketItemsProj = basketItemRepository.findBasketItemsByUserId(user.getId());
        basketItemsProj.forEach(item -> {
            ProductItemProjection productQuantityAndPriceProj = productItemRepository
                    .findQuantityAndPrice(item.getProductItemId())
                    .orElseThrow(() -> new ResourceNotFoundException(PRODUCT_NOT_FOUND));
            if (productQuantityAndPriceProj.getStockQuantity() < item.getQuantity())
                throw new OutOfStockException("Stock quantity for item with id: " + productQuantityAndPriceProj.getId() + " = " + productQuantityAndPriceProj.getStockQuantity());
            productItemRepository.reduceQuantity(item.getQuantity(), item.getProductItemId());

            BasketItem basketItem = new BasketItem();
            basketItem.setId(item.getId());

            double totalPrice = productQuantityAndPriceProj.getPrice().doubleValue() * item.getQuantity();
            CheckoutItem checkoutItem = CheckoutItem.builder()
                    .basketItem(basketItem)
                    .user(user)
                    .quantity(item.getQuantity())
                    .totalPrice(BigDecimal.valueOf(totalPrice))
                    .build();
            checkoutItemRepository.save(checkoutItem);
        });


    }
}
