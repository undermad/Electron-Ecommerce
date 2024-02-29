package com.electron.rest.mapper;

import com.electron.rest.dto.product.FeatureDto;
import com.electron.rest.dto.product.ProductResponse;
import com.electron.rest.dto.product.ReviewDto;
import com.electron.rest.entity.product.ProductItem;
import com.electron.rest.entity.projections.ProductItemProjection;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.stream.Collectors;

@Component
public class ProductMapper {


    public ProductResponse mapProductItemToProductResponse(ProductItemProjection productItem) {
        return ProductResponse.builder()
                .name(productItem.getName())
                .description(productItem.getDescription())
                .price(productItem.getPrice())
                .currentRate(productItem.getCurrentRate())
                .stockQuantity(productItem.getStockQuantity())
                .productInformation(productItem.getProductInformation())
                .sku(productItem.getSku())
                .build();
    }

    public ProductResponse mapRawObjectToProductResponse(Object[] rawObject, String category) {
        return ProductResponse.builder()
                .productId((Long) rawObject[0])
                .name(rawObject[1].toString())
                .description(rawObject[2].toString())
                .price((BigDecimal) rawObject[3])
                .imgUrl(rawObject[4].toString())
                .stockQuantity((Integer) rawObject[5])
                .categoryId((Long) rawObject[6])
                .currentRate((BigDecimal) rawObject[7])
                .category(category)
                .build();
    }

    public ProductResponse mapRawObjectToProductResponseQuery(Object[] rawObject) {
        return ProductResponse.builder()
                .productId((Long) rawObject[0])
                .name(rawObject[1].toString())
                .description(rawObject[2].toString())
                .price((BigDecimal) rawObject[3])
                .imgUrl(rawObject[4].toString())
                .stockQuantity((Integer) rawObject[5])
                .categoryId((Long) rawObject[6])
                .currentRate((BigDecimal) rawObject[7])
                .category(rawObject[8].toString())
                .build();
    }

    public ProductResponse mapProductItemProjectionToProductResponse(ProductItemProjection productItemProjection) {
        return ProductResponse.builder()
                .productId((productItemProjection.getId()))
                .name(productItemProjection.getName())
                .description(productItemProjection.getDescription())
                .price(productItemProjection.getPrice())
                .imgUrl(productItemProjection.getImgUrl())
                .stockQuantity(productItemProjection.getStockQuantity())
                .categoryId(productItemProjection.getCategoryId())
                .currentRate(productItemProjection.getCurrentRate())
                .category(productItemProjection.getCategoryName())
                .build();
    }


}
