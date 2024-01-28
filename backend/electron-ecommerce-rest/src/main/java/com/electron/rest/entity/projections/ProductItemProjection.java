package com.electron.rest.entity.projections;

import com.electron.rest.entity.product.Category;
import com.electron.rest.entity.product.VariationOption;

import java.math.BigDecimal;
import java.util.Set;

public interface ProductItemProjection {
    Long getId();
    String getName();
    String getDescription();
    String getSku();
    String getImgUrl();
    Integer getStockQuantity();
    BigDecimal getPrice();
    Category getCategory();
    Set<VariationOption> getVariationOptions();


}
