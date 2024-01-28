package com.electron.rest.mapper;

import com.electron.rest.dto.product.ProductResponse;
import com.electron.rest.entity.product.ProductItem;
import com.electron.rest.entity.product.VariationOption;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class ProductMapper {

    public ProductResponse mapProductItemToProductResponse(ProductItem product) {
        return ProductResponse.builder()
                .name(product.getName())
                .description(product.getDescription())
                .sku(product.getSku())
                .imgUrl(product.getImgUrl())
                .stockQuantity(product.getStockQuantity())
                .price(product.getPrice())
                .features(product.getVariationOptions()
                        .stream()
                        .map(VariationOption::getValue)
                        .collect(Collectors.toList()))
                .build();
    }


}
