package com.electron.rest.repository;

import com.electron.rest.entity.orders.CheckoutItem;
import com.electron.rest.entity.projections.CheckoutItemProjection;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.util.List;

public interface CheckoutItemRepository extends CrudRepository<CheckoutItem, Long> {

    @Query(value = """
                    SELECT ci.basket_item_id as basketItemId,
                    ci.quantity as quantity,
                    ci.total_price as totalPrice,
                    bi.product_item_id as productItemId
                    FROM checkout_items ci
                    JOIN basket_items bi ON ci.basket_item_id = bi.id
                    WHERE ci.user_id = :userId
            """, nativeQuery = true)
    List<CheckoutItemProjection> findCheckoutItemsByUserId(@Param("userId") Long userId);

    @Modifying
    @Query(value = """
                DELETE FROM checkout_items ci
                WHERE ci.id = :checkoutItemId
            """, nativeQuery = true)
    void deleteItemById(@Param("checkoutItemId") Long checkoutItemId);


    @Query(value = """
                    SELECT ci.id as id,
                    ci.quantity as quantity,
                    bi.product_item_id as productItemId
                    FROM checkout_items ci
                    JOIN basket_items bi ON ci.basket_item_id = bi.id
                    WHERE ci.created_on <= :cutoff
            """, nativeQuery = true)
    List<CheckoutItemProjection> findItemsOlderThan(@Param("cutoff") Instant cutoff);
}
