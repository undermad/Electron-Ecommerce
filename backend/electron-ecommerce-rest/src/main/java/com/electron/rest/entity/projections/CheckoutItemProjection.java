package com.electron.rest.entity.projections;

import com.electron.rest.entity.account.BasketItem;

import java.math.BigDecimal;

public interface CheckoutItemProjection {
    Long getId();
    Long getUserId();
    Long getBasketItemId();
    Long getProductItemId();
    BigDecimal getTotalPrice();
    Integer getQuantity();
    BigDecimal getUnitPrice();
}
