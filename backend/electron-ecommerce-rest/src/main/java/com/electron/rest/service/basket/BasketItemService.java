package com.electron.rest.service.basket;

import com.electron.rest.constants.ErrorMessages;
import com.electron.rest.dto.auth.MessageResponse;
import com.electron.rest.dto.basket.AddItemRequest;
import com.electron.rest.entity.basket.BasketItem;
import com.electron.rest.entity.product.ProductItem;
import com.electron.rest.entity.projections.BasketItemProjection;
import com.electron.rest.entity.projections.ProductItemProjection;
import com.electron.rest.entity.user.User;
import com.electron.rest.exception.OutOfStockException;
import com.electron.rest.exception.ResourceNotFoundException;
import com.electron.rest.repository.auth.UserRepository;
import com.electron.rest.repository.basket.BasketItemRepository;
import com.electron.rest.repository.product.ProductItemRepository;
import com.electron.rest.security.token.jwt.JwtProvider;
import jakarta.transaction.Transactional;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static com.electron.rest.constants.ErrorMessages.OUT_OF_STOCK;
import static com.electron.rest.constants.ErrorMessages.PRODUCT_NOT_FOUND;


@Service
@Transactional
public class BasketItemService {

    private final BasketItemRepository basketItemRepository;
    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;
    private final ProductItemRepository productItemRepository;

    public BasketItemService(BasketItemRepository basketItemRepository, JwtProvider jwtProvider, UserRepository userRepository, ProductItemRepository productItemRepository) {
        this.basketItemRepository = basketItemRepository;
        this.jwtProvider = jwtProvider;
        this.userRepository = userRepository;
        this.productItemRepository = productItemRepository;
    }

    public void addItemToBasket(String jwt, AddItemRequest addItemRequest) {
        Long productItemId = addItemRequest.productId();
        ProductItemProjection productItemProjection = productItemRepository.findProductItemQuantity(productItemId)
                .orElseThrow(() -> new ResourceNotFoundException(PRODUCT_NOT_FOUND));
        if (productItemProjection.getStockQuantity() == 0 || productItemProjection.getStockQuantity() <= addItemRequest.beforeQuantityInBasket())
            throw new OutOfStockException(OUT_OF_STOCK);

        ProductItem productItem = new ProductItem();
        productItem.setId(productItemId);

        String email = jwtProvider.getSubject(jwt);
        Long userId = userRepository.findUserIdFromEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(ErrorMessages.USER_NOT_FOUND)).getId();
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
}
