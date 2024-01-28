package com.electron.rest.service.product;

import com.electron.rest.dto.PageableResponse;
import com.electron.rest.dto.product.ProductResponse;
import com.electron.rest.entity.product.ProductItem;
import com.electron.rest.entity.projections.CategoryProjection;
import com.electron.rest.exception.ResourceNotFoundException;
import com.electron.rest.mapper.ProductMapper;
import com.electron.rest.repository.product.CategoryRepository;
import com.electron.rest.repository.product.ProductItemRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static com.electron.rest.constants.ErrorMessages.CATEGORY_NOT_FOUND;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductItemRepository productItemRepository;
    private final CategoryRepository categoryRepository;
    private final ProductMapper productMapper;

    public ProductServiceImpl(ProductItemRepository productItemRepository, CategoryRepository categoryRepository, ProductMapper productMapper) {
        this.productItemRepository = productItemRepository;
        this.categoryRepository = categoryRepository;
        this.productMapper = productMapper;
    }


    @Override
    public PageableResponse<ProductResponse> getProductsByFilter(List<String> variations, String category, int pageNo) {

        Optional<CategoryProjection> categoryProjectionAsOptional = categoryRepository.findCategoryIdByName(category);
        if (categoryProjectionAsOptional.isEmpty()) throw new ResourceNotFoundException(CATEGORY_NOT_FOUND);
        Long categoryId = categoryProjectionAsOptional.get().getId();
        Pageable pageable = PageRequest.of(pageNo, 25);

        Page<ProductItem> productItems;
        if (variations != null) {
            productItems = productItemRepository
                    .findByAllVariationsAndCategory(variations, (long) variations.size(), categoryId, pageable);
        } else {
            productItems = productItemRepository.findByCategory_Id(categoryId, pageable);
        }

        List<ProductResponse> productsList = productItems
                .stream()
                .map(productMapper::mapProductItemToProductResponse)
                .toList();


        return PageableResponse.<ProductResponse>builder()
                .resourceName(category)
                .pageNo(productItems.getNumber())
                .pageSize(productItems.getSize())
                .totalPages(productItems.getTotalPages())
                .totalElements(productItems.getTotalElements())
                .content(productsList)
                .build();
    }
}
