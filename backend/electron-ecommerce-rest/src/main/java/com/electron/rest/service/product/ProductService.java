package com.electron.rest.service.product;

import com.electron.rest.dto.PageableResponse;
import com.electron.rest.dto.product.ProductByFiltersRequest;
import com.electron.rest.dto.product.FeatureDto;
import com.electron.rest.dto.product.ProductResponse;
import com.electron.rest.entity.projections.CategoryProjection;
import com.electron.rest.entity.projections.FeatureProjection;
import com.electron.rest.entity.projections.ProductItemProjection;
import com.electron.rest.entity.projections.ReviewProjection;
import com.electron.rest.exception.ResourceNotFoundException;
import com.electron.rest.mapper.ProductMapper;
import com.electron.rest.mapper.ReviewMapper;
import com.electron.rest.repository.product.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    private final ProductDetailsRepository productDetailsRepository;

    @Value("${app-page-size}")
    private Integer pageSize;

    public ProductService(CategoryRepository categoryRepository, ProductItemRepository productItemRepository, ProductMapper productMapper, ProductItemWithFilterRepository productItemWithFilterRepository, ReviewRepository reviewRepository, ReviewMapper reviewMapper, ProductDetailsRepository productDetailsRepository) {
        this.categoryRepository = categoryRepository;
        this.productItemRepository = productItemRepository;
        this.productMapper = productMapper;
        this.productItemWithFilterRepository = productItemWithFilterRepository;
        this.reviewRepository = reviewRepository;
        this.reviewMapper = reviewMapper;
        this.productDetailsRepository = productDetailsRepository;
    }

    public List<ProductResponse> getHotProducts(String category) {
        List<ProductItemProjection> itemsProjections = productItemRepository.getHotMemory(category);
        return itemsProjections.stream()
                .map(productItemProjection -> {
                    ProductResponse productResponse = productMapper.mapProductItemProjectionToProductResponse(productItemProjection);
                    productResponse.setTotalReviews(reviewRepository.count(productResponse.getProductId()));
                    return productResponse;
                })
                .collect(Collectors.toList());
    }

    public List<ProductResponse> getHotProducts() {
        List<ProductItemProjection> itemsProjections = productItemRepository.getHotProducts();
        return itemsProjections.stream()
                .map(productItemProjection -> {
                    ProductResponse productResponse = productMapper.mapProductItemProjectionToProductResponse(productItemProjection);
                    productResponse.setTotalReviews(reviewRepository.count(productResponse.getProductId()));
                    return productResponse;
                })
                .collect(Collectors.toList());
    }


    public PageableResponse<ProductResponse> getProductsBySearchEngine(String query, Integer pageNo, String sortBy, String sortDirection) {

        List<Object[]> products = productItemWithFilterRepository.findProductsByQuery(query, pageNo, sortBy, sortDirection);
        int totalElements = productItemRepository.findProductTotalRow(query);

        return PageableResponse.<ProductResponse>builder()
                .content(products
                        .stream()
                        .map(product -> {
                            ProductResponse productResponse = productMapper.mapRawObjectToProductResponseQuery(product);
                            productResponse.setTotalReviews(reviewRepository.count(productResponse.getProductId()));
                            return productResponse;
                        })
                        .collect(Collectors.toList()))
                .pageNo(pageNo + 1)
                .pageSize(pageSize)
                .totalElements(totalElements)
                .resourceName("Products by query")
                .totalPages((totalElements / pageSize) + 1)
                .build();
    }


    @Transactional
    public ProductResponse getProductById(Long productId) {
        ProductItemProjection productAsProjection = productItemRepository.findProductById(productId)
                .orElseThrow(() -> new ResourceNotFoundException(PRODUCT_NOT_FOUND));
        ProductResponse productResponse = productMapper.mapProductItemToProductResponse(productAsProjection);
        productResponse.setProductId(productId);

        String category = categoryRepository.findCategoryNameById(productAsProjection.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException(CATEGORY_NOT_FOUND)).getName();

        productResponse.setCategory(category);

        List<ProductItemProjection> imagesAsProjections = productItemRepository
                .findProductImages(productAsProjection.getProductDetailsId());

        if (!imagesAsProjections.isEmpty())
            productResponse.setImages(imagesAsProjections
                    .stream()
                    .map(ProductItemProjection::getImg)
                    .collect(Collectors.toSet()));

        List<ReviewProjection> listOfReviewProjections = reviewRepository.findAllByProductId(productId);
        if (!listOfReviewProjections.isEmpty())
            productResponse.setReviews(listOfReviewProjections
                    .stream()
                    .map((reviewMapper::mapReviewToDto))
                    .collect(Collectors.toList()));

        List<FeatureProjection> featuresAsProjections = productItemRepository.findProductFeatures(productId);
        if (!featuresAsProjections.isEmpty())
            productResponse.setFeatures(featuresAsProjections
                    .stream()
                    .map(feature -> new FeatureDto(feature.getName(), feature.getValue()))
                    .collect(Collectors.toList()));

        productDetailsRepository.increaseVisitsByOne(productAsProjection.getProductDetailsId());


        return productResponse;
    }


    public PageableResponse<ProductResponse> getProductsByFilters(ProductByFiltersRequest productByFiltersRequest, Integer pageNo, String category, String sortBy, String sortDirection) {
        Optional<CategoryProjection> categoryProjectionAsOptional = categoryRepository.findCategoryIdByName(category);
        if (categoryProjectionAsOptional.isEmpty()) throw new ResourceNotFoundException(CATEGORY_NOT_FOUND);
        Long categoryId = categoryProjectionAsOptional.get().getId();

        List<Object> totalElementsAsRaw = productItemWithFilterRepository.findTotalElementsFromFilter(productByFiltersRequest.getFilters(), categoryId, productByFiltersRequest.getPriceRange());
        int totalElements = Integer.parseInt(totalElementsAsRaw.getFirst().toString());


        List<Object[]> rawResult = productItemWithFilterRepository.findProductByFilters(
                productByFiltersRequest.getFilters(),
                categoryId,
                productByFiltersRequest.getPriceRange(),
                pageNo,
                sortBy,
                sortDirection);

        return PageableResponse.<ProductResponse>builder()
                .content(rawResult
                        .stream()
                        .map(rawProduct -> {
                            ProductResponse productResponse = productMapper.mapRawObjectToProductResponse(rawProduct, category);
                            productResponse.setTotalReviews(reviewRepository.count(productResponse.getProductId()));
                            return productResponse;
                        })
                        .toList())
                .pageNo(pageNo + 1)
                .pageSize(pageSize)
                .totalElements(totalElements)
                .resourceName(category + " with filters")
                .totalPages((totalElements / pageSize) + 1)
                .build();
    }




}
