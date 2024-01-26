package com.electron.rest.controller;

import com.electron.rest.dto.product.CategoryResponse;
import com.electron.rest.service.product.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.electron.rest.constants.EndpointsPaths.API_V1_CATEGORY;

@RestController
@RequestMapping(API_V1_CATEGORY)
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }


    @GetMapping("/{category}")
    public ResponseEntity<CategoryResponse> getCategory(@PathVariable String category) {
        return ResponseEntity.ok(categoryService.getCategory(category));
    }
}
