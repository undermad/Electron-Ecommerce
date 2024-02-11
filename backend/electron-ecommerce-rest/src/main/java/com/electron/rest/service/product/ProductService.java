package com.electron.rest.service.product;

import com.electron.rest.dto.PageableResponse;
import com.electron.rest.dto.ProductByFiltersRequest;
import com.electron.rest.dto.product.ProductResponse;
import com.electron.rest.dto.product.ReviewDto;
import com.electron.rest.entity.product.ProductItem;
import com.electron.rest.entity.projections.CategoryProjection;
import com.electron.rest.entity.projections.ReviewProjection;
import com.electron.rest.exception.ResourceNotFoundException;
import com.electron.rest.mapper.ProductMapper;
import com.electron.rest.mapper.ReviewMapper;
import com.electron.rest.repository.product.CategoryRepository;
import com.electron.rest.repository.product.ProductItemRepository;
import com.electron.rest.repository.product.ProductItemWithFilterRepository;
import com.electron.rest.repository.product.ReviewRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.electron.rest.constants.ErrorMessages.CATEGORY_NOT_FOUND;
import static com.electron.rest.constants.ErrorMessages.PRODUCT_NOT_FOUND;

@Service
public class ProductService {

    private final CategoryRepository categoryRepository;
    private final ProductItemRepository productItemRepository;
    private final ProductMapper productMapper;
    private final ProductItemWithFilterRepository productItemWithFilterRepository;
    private final ReviewRepository reviewRepository;
    private final ReviewMapper reviewMapper;

    @Value("${app-page-size}")
    private Integer pageSize;

    public ProductService(CategoryRepository categoryRepository, ProductItemRepository productItemRepository, ProductMapper productMapper, ProductItemWithFilterRepository productItemWithFilterRepository, ReviewRepository reviewRepository, ReviewMapper reviewMapper) {
        this.categoryRepository = categoryRepository;
        this.productItemRepository = productItemRepository;
        this.productMapper = productMapper;
        this.productItemWithFilterRepository = productItemWithFilterRepository;
        this.reviewRepository = reviewRepository;
        this.reviewMapper = reviewMapper;
    }


    public ProductResponse getProductById(Long productId) {
        ProductItem productItem = productItemRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException(PRODUCT_NOT_FOUND));

        ProductResponse productResponse = productMapper.mapProductItemToProductResponse(productItem);

        List<ReviewProjection> listOfReviewProjections = reviewRepository.findAllByProductId(productId);
        if (!listOfReviewProjections.isEmpty())
            productResponse.setReviews(listOfReviewProjections
                    .stream()
                    .map((reviewMapper::mapReviewToDto))
                    .collect(Collectors.toList()));
        return productResponse;

    }


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
