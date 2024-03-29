package com.electron.rest.repository.account;

import com.electron.rest.entity.account.BasketItem;
import com.electron.rest.entity.projections.BasketItemProjection;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
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

    @Query(value = """
            SELECT bi.id as id,
                   bi.product_item_id as productItemId,
                   bi.quantity as quantity
            FROM basket_items bi
            WHERE bi.user_id = :userId
            """, nativeQuery = true)
    List<BasketItemProjection> findBasketItemsByUserId(@Param("userId") Long userId);

    @Modifying
    @Query(value = """
            UPDATE basket_items bi 
            SET bi.quantity = bi.quantity - 1
            WHERE bi.id = :basketItemId
            """, nativeQuery = true)
    void decreaseQuantityByOne(@Param("basketItemId") Long basketItemId);

    @Modifying
    @Query(value = "DELETE FROM basket_items bi WHERE bi.id = :basketItemId")
    void remove(@Param("basketItemId") Long basketItemId);

}
