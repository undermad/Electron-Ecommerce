package com.electron.rest.dto.product;

import java.util.List;
import java.util.Map;

public record CategoryResponse(
        String name,
        Map<String, List<String>> filters,
        List<ProductDto> productDto
){}
