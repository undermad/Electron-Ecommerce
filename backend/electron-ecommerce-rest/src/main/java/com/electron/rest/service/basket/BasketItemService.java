package com.electron.rest.service.basket;

import com.electron.rest.constants.ErrorMessages;
import com.electron.rest.dto.basket.AddItemRequest;
import com.electron.rest.dto.basket.BasketPosition;
import com.electron.rest.dto.basket.BasketResponse;
import com.electron.rest.dto.basket.RemoveItemRequest;
import com.electron.rest.dto.product.ProductResponse;
import com.electron.rest.entity.basket.BasketItem;
import com.electron.rest.entity.product.ProductItem;
import com.electron.rest.entity.projections.BasketItemProjection;
import com.electron.rest.entity.projections.ProductItemProjection;
import com.electron.rest.entity.user.User;
import com.electron.rest.exception.OutOfStockException;
import com.electron.rest.exception.ResourceNotFoundException;
import com.electron.rest.mapper.ProductMapper;
import com.electron.rest.repository.auth.UserRepository;
import com.electron.rest.repository.basket.BasketItemRepository;
import com.electron.rest.repository.product.ProductItemRepository;
import com.electron.rest.security.token.jwt.JwtProvider;
import jakarta.transaction.Transactional;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.electron.rest.constants.ErrorMessages.*;


@Service
@Transactional
public class BasketItemService {

    private final BasketItemRepository basketItemRepository;
    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;
    private final ProductItemRepository productItemRepository;
    private final ProductMapper productMapper;

    public BasketItemService(BasketItemRepository basketItemRepository, JwtProvider jwtProvider, UserRepository userRepository, ProductItemRepository productItemRepository, ProductMapper productMapper) {
        this.basketItemRepository = basketItemRepository;
        this.jwtProvider = jwtProvider;
        this.userRepository = userRepository;
        this.productItemRepository = productItemRepository;
        this.productMapper = productMapper;
    }

    public BasketResponse getUserBasket(String jwt) {
        String email = jwtProvider.getSubject(jwt);
        Long userId = userRepository.findUserIdFromEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(USER_NOT_FOUND)).getId();
        List<BasketItemProjection> basketItemProjections = basketItemRepository.findBasketItemsByUserId(userId);
        List<BasketPosition> products = new ArrayList<>();
        if (basketItemProjections.isEmpty()) return new BasketResponse(products);
        for (BasketItemProjection basketItemProjection : basketItemProjections) {

            ProductItemProjection productItemProjection = productItemRepository.findProductListItem(basketItemProjection.getProductItemId())
                    .orElseThrow(() -> new ResourceNotFoundException(PRODUCT_NOT_FOUND));
            ProductResponse productResponse = productMapper.mapProductItemProjectionToProductResponse(productItemProjection);
            products.add(new BasketPosition(productResponse, basketItemProjection.getQuantity()));
        }
        return new BasketResponse(products);
    }

    public void increaseItemQuantity(String jwt, AddItemRequest addItemRequest) {
        Long productItemId = addItemRequest.productId();
        ProductItemProjection productItemProjection = productItemRepository.findProductItemQuantity(productItemId)
                .orElseThrow(() -> new ResourceNotFoundException(PRODUCT_NOT_FOUND));
        if (productItemProjection.getStockQuantity() == 0 || productItemProjection.getStockQuantity() <= addItemRequest.beforeQuantityInBasket())
            throw new OutOfStockException(OUT_OF_STOCK);

        ProductItem productItem = new ProductItem();
        productItem.setId(productItemId);

        Long userId = getUserIdFromJwt(jwt);
        User user = new User();
        user.setId(userId);

        Optional<BasketItemProjection> basketItemProjection = basketItemRepository.findBasketItem(productItemId, userId);
        if (basketItemProjection.isEmpty()) {
            BasketItem basketItem = BasketItem.builder()
                    .user(user)
                    .product(productItem)
                    .quantity(1)
                    .build();
            basketItemRepository.save(basketItem);
        } else {
            basketItemRepository.updateQuantity(
                    basketItemProjection.get().getQuantity() + 1,
                    basketItemProjection.get().getId());
        }
    }

    public void decreaseItemQuantity(String jwt, RemoveItemRequest removeItemRequest) {
        Long userId = getUserIdFromJwt(jwt);
        BasketItemProjection basketItemProjection = basketItemRepository.findBasketItem(removeItemRequest.productId(), userId)
                .orElseThrow(() -> new ResourceNotFoundException(PRODUCT_NOT_FOUND));
        int quantity = basketItemProjection.getQuantity();
        Long basketItemId = basketItemProjection.getId();
        if (quantity > 1)
            basketItemRepository.decreaseQuantityByOne(basketItemId);
        else basketItemRepository.removeItemById(basketItemId);
    }

    private Long getUserIdFromJwt(String jwt) {
        String email = jwtProvider.getSubject(jwt);
        return userRepository.findUserIdFromEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(ErrorMessages.USER_NOT_FOUND)).getId();
    }

}
