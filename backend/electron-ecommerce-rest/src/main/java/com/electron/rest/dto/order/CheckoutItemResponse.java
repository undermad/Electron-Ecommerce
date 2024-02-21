package com.electron.rest.dto.order;

import com.electron.rest.dto.product.ProductResponse;

import java.util.List;

public record CheckoutItemResponse(
        List<ProductResponse> products,
        Double orderTotalPrice,
        Integer totalItems
) {
}
