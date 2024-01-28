package com.electron.rest.service.product;

import com.electron.rest.dto.PageableResponse;
import com.electron.rest.dto.product.ProductResponse;

import java.util.List;

public interface ProductService {
    PageableResponse<ProductResponse> getProductsByFilter(List<String> variations, String category, int pageNo);
}
