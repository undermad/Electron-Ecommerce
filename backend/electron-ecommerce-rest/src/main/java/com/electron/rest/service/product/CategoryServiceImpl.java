package com.electron.rest.service.product;

import com.electron.rest.dto.product.CategoryResponse;
import com.electron.rest.entity.product.Category;
import com.electron.rest.entity.projections.ProductItemProjection;
import com.electron.rest.exception.ResourceNotFoundException;
import com.electron.rest.mapper.CategoryMapper;
import com.electron.rest.repository.product.CategoryRepository;
import com.electron.rest.repository.product.ProductItemRepository;
import org.springframework.stereotype.Service;


import java.util.Optional;

import static com.electron.rest.constants.ErrorMessages.CATEGORY_NOT_FOUND;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final ProductItemRepository productItemRepository;
    private final CategoryMapper categoryMapper;

    public CategoryServiceImpl(CategoryRepository categoryRepository, ProductItemRepository productItemRepository, CategoryMapper categoryMapper) {
        this.categoryRepository = categoryRepository;
        this.productItemRepository = productItemRepository;
        this.categoryMapper = categoryMapper;
    }

    @Override
    public CategoryResponse getCategory(String categoryName) {
        Category category = categoryRepository.findCategoryByName(categoryName)
                .orElseThrow(() -> new ResourceNotFoundException(CATEGORY_NOT_FOUND));
        CategoryResponse categoryResponse = categoryMapper.mapCategoryToCategoryResponse(category);
        Optional<ProductItemProjection> expensiveItemAsOptional = productItemRepository
                .findCheapestProductByCategoryId(category.getId());
        expensiveItemAsOptional.ifPresent(productItemProjection -> categoryResponse
                .setMaxPrice(
                        Math.ceil(productItemProjection.getPrice().doubleValue() / 10) * 10
                ));
        return categoryResponse;
    }
}
