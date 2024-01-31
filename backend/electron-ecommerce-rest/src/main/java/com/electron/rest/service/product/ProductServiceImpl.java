package com.electron.rest.service.product;

import com.electron.rest.dto.PageableResponse;
import com.electron.rest.dto.ProductByFiltersRequest;
import com.electron.rest.dto.product.ProductResponse;
import com.electron.rest.entity.product.ProductItem;
import com.electron.rest.entity.projections.CategoryProjection;
import com.electron.rest.exception.InvalidInputException;
import com.electron.rest.exception.ResourceNotFoundException;
import com.electron.rest.mapper.ProductMapper;
import com.electron.rest.repository.product.CategoryRepository;
import com.electron.rest.repository.product.ProductItemRepository;
import com.electron.rest.repository.product.ProductItemWithFilterRepository;
import org.apache.coyote.BadRequestException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.electron.rest.constants.ErrorMessages.CATEGORY_NOT_FOUND;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductItemRepository productItemRepository;
    private final CategoryRepository categoryRepository;
    private final ProductMapper productMapper;

    private final ProductItemWithFilterRepository productItemWithFilterRepository;

    public ProductServiceImpl(ProductItemRepository productItemRepository, CategoryRepository categoryRepository, ProductMapper productMapper, ProductItemWithFilterRepository productItemWithFilterRepository) {
        this.productItemRepository = productItemRepository;
        this.categoryRepository = categoryRepository;
        this.productMapper = productMapper;
        this.productItemWithFilterRepository = productItemWithFilterRepository;
    }


    @Override
    public PageableResponse<ProductResponse> getProductsByCategory(String category, int pageNo) {

        Optional<CategoryProjection> categoryProjectionAsOptional = categoryRepository.findCategoryIdByName(category);
        if (categoryProjectionAsOptional.isEmpty()) throw new ResourceNotFoundException(CATEGORY_NOT_FOUND);
        Long categoryId = categoryProjectionAsOptional.get().getId();
        Pageable pageable = PageRequest.of(pageNo, 25);

        Page<ProductItem> productItems = productItemRepository.findByCategory_Id(categoryId, pageable);

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

    @Override
    public PageableResponse<ProductResponse> getProductsByFilters(ProductByFiltersRequest productByFiltersRequest, Integer pageNo) {
        Optional<CategoryProjection> categoryProjectionAsOptional = categoryRepository.findCategoryIdByName(productByFiltersRequest.getCategory());
        if (categoryProjectionAsOptional.isEmpty()) throw new ResourceNotFoundException(CATEGORY_NOT_FOUND);
        Long categoryId = categoryProjectionAsOptional.get().getId();

        List<Object[]> totalElementsResult = productItemWithFilterRepository.countRecords(productByFiltersRequest.getFilters(), categoryId, productByFiltersRequest.getMinPrice(), productByFiltersRequest.getMaxPrice());
        Long totalElements = (Long) totalElementsResult.getFirst()[0];
        if (pageNo * 10 == totalElements && totalElements != 0) throw new InvalidInputException("Page doesn't exist.");
        List<Object[]> rawResult = productItemWithFilterRepository.findProductByFilters(
                productByFiltersRequest.getFilters(),
                categoryId,
                productByFiltersRequest.getMinPrice(),
                productByFiltersRequest.getMaxPrice(),
                pageNo);

        return PageableResponse.<ProductResponse>builder()
                .content(rawResult
                        .stream()
                        .map(productMapper::mapRawObjectToProductResponse)
                        .toList())
                .pageNo(pageNo)
                .pageSize(10)
                .totalElements(totalElements)
                .resourceName(productByFiltersRequest.getCategory() + " with filters")
                .totalPages((int) (totalElements / 10))
                .build();

    }


}
