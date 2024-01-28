package com.electron.rest.service.product;

import com.electron.rest.dto.PageableResponse;
import com.electron.rest.dto.product.ProductResponse;
import com.electron.rest.entity.projections.ProductItemProjection;

import java.util.List;
import java.util.Map;

public interface ProductService {
    PageableResponse<ProductResponse> getProductsByFilter(List<String> variations, String category, int pageNo);
    List<Object[]> getProducts(Map<String, List<String>> filters, Long categoryId);
}
