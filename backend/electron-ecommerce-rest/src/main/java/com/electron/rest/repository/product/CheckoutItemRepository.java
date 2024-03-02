package com.electron.rest.repository.product;

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
                    SELECT ci.id as id,
                    ci.basket_item_id as basketItemId,
                    ci.quantity as quantity,
                    pi.price as unitPrice,
                    ci.total_price as totalPrice,
                    bi.product_item_id as productItemId
                    FROM checkout_items ci
                    JOIN basket_items bi ON ci.basket_item_id = bi.id
                    JOIN product_item pi ON bi.product_item_id = pi.id
                    WHERE ci.user_id = :userId
            """, nativeQuery = true)
    List<CheckoutItemProjection> findCheckoutItemsByUserId(@Param("userId") Long userId);

    @Modifying
    @Query(value = """
                DELETE FROM checkout_items ci
                WHERE ci.id = :checkoutItemId
            """, nativeQuery = true)
    void deleteItem(@Param("checkoutItemId") Long checkoutItemId);


    @Query(value = """
                    SELECT ci.id as id,
                    ci.quantity as quantity,
                    bi.product_item_id as productItemId
                    FROM checkout_items ci
                    JOIN basket_items bi ON ci.basket_item_id = bi.id
                    WHERE ci.created_on <= :cutoff
            """, nativeQuery = true)
    List<CheckoutItemProjection> getItemsToKill(@Param("cutoff") Instant cutoff);

    @Modifying
    @Query(value = """
            DELETE FROM checkout_items ci
            WHERE ci.user_id = :userId
            """, nativeQuery = true)
    void deleteAllUserItems(@Param("userId") Long userId);

    @Modifying
    @Query(value = "DELETE FROM checkout_items ci WHERE ci.id = :checkoutItemId")
    void remove(@Param("checkoutItemId") Long checkoutItemId);
}
