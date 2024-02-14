package com.electron.rest.repository.basket;

import com.electron.rest.entity.basket.BasketItem;
import com.electron.rest.entity.projections.BasketItemProjection;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface BasketItemRepository extends CrudRepository<BasketItem, Long> {

    @Query(value = """
            SELECT bi.id as id,
                   bi.quantity as quantity
            FROM basket_items bi
            WHERE bi.product_item_id = :productItemId
            AND bi.user_id = :userId
            """, nativeQuery = true)
    Optional<BasketItemProjection> findBasketItem(@Param("productItemId") Long productItemId, @Param("userId") Long userId);

    @Modifying
    @Query(value = "UPDATE basket_items bi SET bi.quantity = :quantity WHERE bi.id = :basketItemId", nativeQuery = true)
    void updateQuantity(@Param("quantity") Integer quantity, @Param("basketItemId") Long basketItemId);

}
