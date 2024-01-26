package com.electron.rest.mapper;

import com.electron.rest.dto.product.ProductDto;
import com.electron.rest.entity.product.ProductItem;
import com.electron.rest.entity.product.VariationOption;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class ProductMapper {

    public ProductDto mapProductItemToProductDto(ProductItem productItem) {
        return ProductDto.builder()
                .name(productItem.getName())
                .description(productItem.getDescription())
                .sku(productItem.getSku())
                .imgUrl(productItem.getImgUrl())
                .stockQuantity(productItem.getStockQuantity())
                .price(productItem.getPrice())
                .features(productItem.getVariationOptions()
                        .stream()
                        .map(VariationOption::getValue)
                        .collect(Collectors.toList()))
                .build();

    }

}
