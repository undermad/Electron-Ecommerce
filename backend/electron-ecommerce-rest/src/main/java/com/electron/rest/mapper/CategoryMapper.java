package com.electron.rest.mapper;

import com.electron.rest.dto.product.CategoryResponse;
import com.electron.rest.dto.product.ProductDto;
import com.electron.rest.entity.product.Category;
import com.electron.rest.entity.product.VariationOption;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;

@Component
public class CategoryMapper {

    private final ProductMapper productMapper;

    public CategoryMapper(ProductMapper productMapper) {
        this.productMapper = productMapper;
    }

    public CategoryResponse mapCategoryToCategoryResponse(Category category) {

        Map<String, List<String>> variations = new HashMap<>();
        category.getVariations().forEach(variation -> {
            String variationName = variation.getName();
            List<String> variationValues = variation.getVariationOptions()
                    .stream()
                    .map(VariationOption::getValue)
                    .toList();
            variations.put(variationName, variationValues);
        });

        List<ProductDto> productsDto = category.getProductItems()
                .stream()
                .map(productMapper::mapProductItemToProductDto)
                .collect(Collectors.toList());

        double maxPrice = 2000D;
        Optional<ProductDto> productWithHighestPrice = productsDto
                .stream()
                .max(Comparator.comparingDouble(p -> p.getPrice().doubleValue()));
        if (productWithHighestPrice.isPresent())
            maxPrice = productWithHighestPrice.get().getPrice().doubleValue();

        maxPrice = ((Math.ceil(maxPrice / 10)) * 10);


        return CategoryResponse.builder()
                .name(category.getName())
                .filters(variations)
                .productDto(productsDto)
                .maxPrice(maxPrice)
                .build();
    }
}
