package com.electron.rest.dto;

import lombok.*;

import java.util.List;
import java.util.Map;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
public class ProductByFiltersRequest {
    private Map<String, List<String>> filters;
    private Integer minPrice;
    private Integer maxPrice;
    private String category;
}
