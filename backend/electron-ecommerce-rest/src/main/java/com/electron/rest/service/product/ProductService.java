package com.electron.rest.service.product;

import com.electron.rest.dto.PageableResponse;
import com.electron.rest.dto.ProductByFiltersRequest;
import com.electron.rest.dto.product.ProductResponse;

import java.util.List;

public interface ProductService {
    PageableResponse<ProductResponse> getProductsByCategory(String category, int pageNo);
    PageableResponse<ProductResponse> getProductsByFilters(ProductByFiltersRequest productByFiltersRequest, Integer pageNo);
}
