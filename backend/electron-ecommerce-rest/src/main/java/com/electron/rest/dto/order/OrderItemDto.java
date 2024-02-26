package com.electron.rest.dto.order;

import lombok.Builder;

@Builder
public record OrderItemDto(
        String name,
        String description,
        String imgUrl,
        Double totalPrice,
        Integer quantity
        ) {
}
