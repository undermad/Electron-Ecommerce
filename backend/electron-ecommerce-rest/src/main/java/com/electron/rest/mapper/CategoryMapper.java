package com.electron.rest.mapper;

import com.electron.rest.dto.product.CategoryResponse;
import com.electron.rest.entity.product.Category;
import com.electron.rest.entity.product.VariationOption;
import com.electron.rest.entity.projections.CategoryProjection;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class CategoryMapper {

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

        return CategoryResponse.builder()
                .name(category.getName())
                .filters(variations)
                .maxPrice(2000D)
                .build();
    }


    public CategoryResponse mapProjctionToCategoryResponse(CategoryProjection categoryResponse) {
        return CategoryResponse.builder()
                .name(categoryResponse.getName())
                .build();
    }
}
