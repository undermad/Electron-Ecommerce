package com.electron.rest.dto.product;

import lombok.*;

import java.util.List;
import java.util.Map;

@Builder
@Data
public final class CategoryResponse {
    private String name;
    private Map<String, List<String>> filters;
    private Double maxPrice;
}
