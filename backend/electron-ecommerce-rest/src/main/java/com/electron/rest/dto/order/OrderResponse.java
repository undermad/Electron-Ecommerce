package com.electron.rest.dto.order;

import com.electron.rest.entity.orders.OrderItem;
import lombok.Builder;

import java.util.List;

@Builder
public record OrderResponse(
        String status,
        Integer totalItems,
        Double totalPrice,
        String fullName,
        String streetOne,
        String streetTwo,
        String city,
        String state,
        String postcode,
        List<OrderItemDto> orderItems
) {
}
