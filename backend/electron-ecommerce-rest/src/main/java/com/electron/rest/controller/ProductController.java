package com.electron.rest.controller;

import com.electron.rest.dto.PageableResponse;
import com.electron.rest.dto.ProductByFiltersRequest;
import com.electron.rest.dto.product.ProductResponse;
import com.electron.rest.service.product.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.electron.rest.constants.EndpointsPaths.API_V1_PRODUCT;

@RestController
@RequestMapping(API_V1_PRODUCT)
public class ProductController {


    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<PageableResponse<ProductResponse>> getProducts(
            @RequestParam String category,
            @RequestParam(defaultValue = "0") int pageNo) {

        return ResponseEntity.ok(productService.getProductsByCategory(category, pageNo));
    }

    @PostMapping("/test")
    public ResponseEntity<List<ProductResponse>> getProducts(@RequestBody ProductByFiltersRequest test){
        return ResponseEntity.ok(productService.getProductsByFilters(test));
    }

}
