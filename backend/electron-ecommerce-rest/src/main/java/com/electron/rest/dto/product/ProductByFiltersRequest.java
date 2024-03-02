package com.electron.rest.dto.product;

import com.electron.rest.dto.product.PriceRange;
import lombok.*;

import java.util.List;
import java.util.Map;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
public class ProductByFiltersRequest {
    private Map<String, List<String>> filters;
    private PriceRange priceRange;
}
