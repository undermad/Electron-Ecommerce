package com.electron.rest.dto.product;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Builder
@Getter
public class ProductDto {

    private String name;
    private String description;
    private String sku;
    private String imgUrl;
    private Integer stockQuantity;
    private BigDecimal price;
    private List<String> features;
}
