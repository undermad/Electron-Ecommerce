package com.electron.rest.service.product;

import com.electron.rest.dto.product.CategoryResponse;

import java.util.List;

public interface CategoryService {
    CategoryResponse getCategory(String category);
    List<CategoryResponse> getAllCategories();
}
