package com.electron.rest.repository.order;

import com.electron.rest.entity.orders.Order;
import org.springframework.data.repository.CrudRepository;

public interface OrderRepository extends CrudRepository<Order, Long> {
}
