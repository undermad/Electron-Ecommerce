package com.electron.rest.entity.projections;

import java.math.BigDecimal;

public interface OrderItemProjection {
    String getName();
    String getDescription();
    String getImgUrl();
    BigDecimal getTotalPrice();
    Integer getQuantity();
}
