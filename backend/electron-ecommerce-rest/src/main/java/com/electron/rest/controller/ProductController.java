package com.electron.rest.controller;

import com.electron.rest.dto.PageableResponse;
import com.electron.rest.dto.ProductByFiltersRequest;
import com.electron.rest.dto.product.ProductResponse;
import com.electron.rest.service.product.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.electron.rest.constants.EndpointsPaths.API_V1_CATEGORY;

@RestController
@RequestMapping(API_V1_CATEGORY + "/{category}")
public class ProductController {


    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    public ResponseEntity<PageableResponse<ProductResponse>> getProductsByFilters(
            @RequestBody ProductByFiltersRequest productByFiltersRequest,
            @RequestParam(defaultValue = "0") Integer pageNo,
            @PathVariable(name = "category") String category
    ) {
        return ResponseEntity.ok(productService.getProductsByFilters(productByFiltersRequest, pageNo, category));
    }

}
