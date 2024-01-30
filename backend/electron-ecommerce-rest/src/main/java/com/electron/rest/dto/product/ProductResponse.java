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

    private String name;
    private String description;
    private String sku;
    private String imgUrl;
    private Integer stockQuantity;
    private BigDecimal price;
    private List<String> features;
}
//
//pi.id as id, 0
//pi.name as name, 1
//pi.description as description, 2
//pi.price as price, 3
//pi.sku as sku, 4
//pi.img_url as imgUrl, 5
//pi.stock_quantity as stockQuantity 6    |
