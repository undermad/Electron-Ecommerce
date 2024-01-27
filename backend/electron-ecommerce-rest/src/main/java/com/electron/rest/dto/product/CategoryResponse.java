package com.electron.rest.dto.product;

import lombok.Builder;

import java.util.List;
import java.util.Map;

@Builder
public record CategoryResponse(
        String name,
        Map<String, List<String>> filters,
        Double maxPrice,
        List<ProductDto> productDto
){}
