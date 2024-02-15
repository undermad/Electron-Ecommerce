package com.electron.rest.dto.basket;

import com.electron.rest.dto.product.ProductResponse;

public record BasketPosition(ProductResponse product, Integer quantity) {
}
