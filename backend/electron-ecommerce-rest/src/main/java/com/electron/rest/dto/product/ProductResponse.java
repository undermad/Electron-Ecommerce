package com.electron.rest.dto.product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Builder
@Data

@AllArgsConstructor
@NoArgsConstructor
public class ProductResponse {

    private Long productId;
    private String name;
    private String description;
    private String sku;
    private String imgUrl;
    private Integer stockQuantity;
    private BigDecimal price;
    private List<String> features;
    private Long categoryId;
}
