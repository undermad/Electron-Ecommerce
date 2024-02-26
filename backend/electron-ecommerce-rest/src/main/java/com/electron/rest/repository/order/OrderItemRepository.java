package com.electron.rest.repository.order;

import com.electron.rest.entity.orders.OrderItem;
import com.electron.rest.entity.projections.OrderItemProjection;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderItemRepository extends CrudRepository<OrderItem, Long> {

    @Query(value = """
                SELECT oi.quantity as quantity,
                oi.total_price as totalPrice,
                pi.name as name,
                pi.description as description,
                pi.img_url as imgUrl
                FROM order_items oi
                JOIN product_item pi ON oi.product_item_id = pi.id
                WHERE oi.order_id = :orderId
            """, nativeQuery = true)
    List<OrderItemProjection> getAll(@Param("orderId") Long orderId);
}
