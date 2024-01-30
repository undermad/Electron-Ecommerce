package com.electron.rest.mapper;

import com.electron.rest.dto.product.ProductResponse;
import com.electron.rest.entity.product.ProductItem;
import com.electron.rest.entity.product.VariationOption;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
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

    public ProductResponse mapRawObjectToProductResponse(Object[] rawObject) {
        return ProductResponse.builder()
                .name(rawObject[1].toString())
                .description(rawObject[2].toString())
                .sku(rawObject[4].toString())
                .price((BigDecimal) rawObject[3])
                .imgUrl(rawObject[5].toString())
                .stockQuantity((Integer) rawObject[6])
                .build();
    }


}
