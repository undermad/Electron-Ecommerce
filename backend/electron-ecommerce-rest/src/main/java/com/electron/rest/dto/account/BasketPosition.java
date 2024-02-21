package com.electron.rest.dto.account;

import com.electron.rest.dto.product.ProductResponse;

public record BasketPosition(ProductResponse product, Integer quantity) {
}
