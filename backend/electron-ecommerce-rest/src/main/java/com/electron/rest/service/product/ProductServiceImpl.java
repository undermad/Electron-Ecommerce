package com.electron.rest.service.product;

import com.electron.rest.dto.PageableResponse;
import com.electron.rest.dto.ProductByFiltersRequest;
import com.electron.rest.dto.product.ProductResponse;
import com.electron.rest.entity.product.ProductItem;
import com.electron.rest.entity.projections.CategoryProjection;
import com.electron.rest.exception.ResourceNotFoundException;
import com.electron.rest.mapper.ProductMapper;
import com.electron.rest.repository.product.CategoryRepository;
import com.electron.rest.repository.product.ProductItemRepository;
import com.electron.rest.repository.product.ProductItemWithFilterRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Range;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static com.electron.rest.constants.ErrorMessages.CATEGORY_NOT_FOUND;
import static com.electron.rest.constants.ErrorMessages.PAGE_NOT_FOUND;

@Service
public class ProductServiceImpl implements ProductService {

    private final CategoryRepository categoryRepository;
    private final ProductMapper productMapper;

    @Value("${app-page-size}")
    private Integer pageSize;

    private final ProductItemWithFilterRepository productItemWithFilterRepository;

    public ProductServiceImpl(CategoryRepository categoryRepository, ProductMapper productMapper, ProductItemWithFilterRepository productItemWithFilterRepository) {
        this.categoryRepository = categoryRepository;
        this.productMapper = productMapper;
        this.productItemWithFilterRepository = productItemWithFilterRepository;
    }


    @Override
    public PageableResponse<ProductResponse> getProductsByFilters(ProductByFiltersRequest productByFiltersRequest, Integer pageNo, String category) {
        Optional<CategoryProjection> categoryProjectionAsOptional = categoryRepository.findCategoryIdByName(category);
        if (categoryProjectionAsOptional.isEmpty()) throw new ResourceNotFoundException(CATEGORY_NOT_FOUND);
        Long categoryId = categoryProjectionAsOptional.get().getId();

        List<Object> totalElementsAsRaw = productItemWithFilterRepository.findTotalElementsFromFilter(productByFiltersRequest.getFilters(), categoryId, productByFiltersRequest.getPriceRange());
        int totalElements = Integer.parseInt(totalElementsAsRaw.getFirst().toString());


        List<Object[]> rawResult = productItemWithFilterRepository.findProductByFilters(
                productByFiltersRequest.getFilters(),
                categoryId,
                productByFiltersRequest.getPriceRange(),
                pageNo);





        return PageableResponse.<ProductResponse>builder()
                .content(rawResult
                        .stream()
                        .map(productMapper::mapRawObjectToProductResponse)
                        .toList())
                .pageNo(pageNo + 1)
                .pageSize(pageSize)
                .totalElements(totalElements)
                .resourceName(category + " with filters")
                .totalPages((totalElements / pageSize) + 1)
                .build();

    }


}
