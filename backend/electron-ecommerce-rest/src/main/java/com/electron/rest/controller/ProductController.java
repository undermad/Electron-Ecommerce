package com.electron.rest.controller;

import com.electron.rest.dto.PageableResponse;
import com.electron.rest.dto.ProductByFiltersRequest;
import com.electron.rest.dto.product.ProductResponse;
import com.electron.rest.service.product.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.electron.rest.constants.EndpointsPaths.*;

@RestController
@RequestMapping(API_V1_PRODUCT)
public class ProductController {


    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }


    @PostMapping("/{category}")
    public ResponseEntity<PageableResponse<ProductResponse>> getProductsByFilters(
            @RequestBody ProductByFiltersRequest productByFiltersRequest,
            @RequestParam(defaultValue = "0") Integer pageNo,
            @RequestParam(defaultValue = "relevance") String sortBy,
            @RequestParam(defaultValue = "ASC") String sortDirection,
            @PathVariable(name = "category") String category) {

        return ResponseEntity.ok(productService.getProductsByFilters(productByFiltersRequest, pageNo, category, sortBy, sortDirection));
    }

    @GetMapping("/{productId}")
    public ResponseEntity<ProductResponse> getProduct(@PathVariable(name = "productId") Long productId) {
        return ResponseEntity.ok(productService.getProductById(productId));
    }

    @GetMapping(GET_BY_QUERY)
    public ResponseEntity<PageableResponse<ProductResponse>> getProductBySearchEngine(
            @RequestParam(defaultValue = "") String query,
            @RequestParam(defaultValue = "0") Integer pageNo,
            @RequestParam(defaultValue = "relevance") String sortBy,
            @RequestParam(defaultValue = "ASC") String sortDirection) {
        return ResponseEntity.ok(productService.getProductsBySearchEngine(query, pageNo, sortBy, sortDirection));
    }

}
