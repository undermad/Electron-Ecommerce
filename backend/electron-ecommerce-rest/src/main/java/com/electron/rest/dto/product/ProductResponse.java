package com.electron.rest.dto.product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

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
    private BigDecimal currentRate;
    private Long categoryId;
    private String category;
    private Integer totalQuantity;

    private String productInformation;
    private Set<String> images;
    private List<FeatureDto> features;
    private List<ReviewDto> reviews;

}
