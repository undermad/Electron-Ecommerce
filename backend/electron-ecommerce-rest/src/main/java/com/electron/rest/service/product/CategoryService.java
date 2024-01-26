package com.electron.rest.service.product;

import com.electron.rest.dto.product.CategoryResponse;

public interface CategoryService {
    CategoryResponse getCategory(String category);
}
