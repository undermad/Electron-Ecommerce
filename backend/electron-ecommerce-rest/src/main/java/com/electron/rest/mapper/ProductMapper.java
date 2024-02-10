package com.electron.rest.mapper;

import com.electron.rest.dto.product.FeatureDto;
import com.electron.rest.dto.product.ProductResponse;
import com.electron.rest.dto.product.ReviewDto;
import com.electron.rest.entity.product.ProductItem;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.stream.Collectors;

@Component
public class ProductMapper {


    public ProductResponse mapProductItemToProductResponse(ProductItem productItem) {
        return ProductResponse.builder()
                .productId(productItem.getId())
                .name(productItem.getName())
                .description(productItem.getDescription())
                .sku(productItem.getSku())
                .imgUrl(productItem.getImgUrl())
                .stockQuantity(productItem.getStockQuantity())
                .price(productItem.getPrice())
                .currentRate(productItem.getOverallRate())
                .categoryId(productItem.getCategory().getId())
                .category(productItem.getCategory().getName())
                .productInformation(productItem.getProductDetails().getProductInformation())
                .images(productItem.getProductDetails().getImages())
                .features(productItem.getVariationOptions()
                        .stream()
                        .map(variation ->
                                new FeatureDto(
                                        variation.getVariation().getName(),
                                        variation.getValue()))
                        .collect(Collectors.toList()))
                .build();
    }

    public ProductResponse mapRawObjectToProductResponse(Object[] rawObject) {
        return ProductResponse.builder()
                .productId((Long) rawObject[0])
                .name(rawObject[1].toString())
                .description(rawObject[2].toString())
                .sku(rawObject[4].toString())
                .price((BigDecimal) rawObject[3])
                .imgUrl(rawObject[5].toString())
                .stockQuantity((Integer) rawObject[6])
                .categoryId((Long) rawObject[7])
                .currentRate((BigDecimal) rawObject[8])
                .build();
    }


}
