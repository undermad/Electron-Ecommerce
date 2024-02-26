package com.electron.rest.repository.order;

import com.electron.rest.entity.orders.Order;
import com.electron.rest.entity.projections.OrderProjection;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends CrudRepository<Order, Long> {

    @Query(value = """
                        SELECT o.id as id,
                        o.status as status,
                        o.price as totalPrice,
                        o.total_items as totalItems,
                        o.delivery_address_id as deliveryAddressId
                        FROM orders o
                        WHERE o.user_id = :userId
            """, nativeQuery = true)
    List<OrderProjection> getAll(@Param("userId") Long userId);
}
