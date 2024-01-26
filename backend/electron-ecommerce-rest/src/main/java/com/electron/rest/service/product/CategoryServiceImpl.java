package com.electron.rest.service.product;

import com.electron.rest.dto.product.CategoryResponse;
import com.electron.rest.entity.product.Category;
import com.electron.rest.exception.ResourceNotFoundException;
import com.electron.rest.mapper.CategoryMapper;
import com.electron.rest.repository.product.CategoryRepository;
import org.springframework.stereotype.Service;


import static com.electron.rest.constants.ErrorMessages.CATEGORY_NOT_FOUND;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    public CategoryServiceImpl(CategoryRepository categoryRepository, CategoryMapper categoryMapper) {
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
    }

    @Override
    public CategoryResponse getCategory(String categoryName) {
        Category category = categoryRepository.findCategoryByName(categoryName)
                .orElseThrow(() -> new ResourceNotFoundException(CATEGORY_NOT_FOUND));
        return categoryMapper.mapCategoryToCategoryResponse(category);
    }
}
