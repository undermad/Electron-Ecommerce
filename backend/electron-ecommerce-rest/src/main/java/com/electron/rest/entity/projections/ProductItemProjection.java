package com.electron.rest.entity.projections;

import com.electron.rest.entity.product.Category;
import com.electron.rest.entity.product.VariationOption;

import java.math.BigDecimal;
import java.util.Set;

public interface ProductItemProjection {
    Long getId();
    Long getProductDetailsId();
    Long getCategoryId();
    String getName();
    String getDescription();
    BigDecimal getPrice();
    BigDecimal getCurrentRate();
    Integer getStockQuantity();
    String getProductInformation();
    String getSku();
    String getImgUrl();
    String getImg();
    String getCategoryName();
}
