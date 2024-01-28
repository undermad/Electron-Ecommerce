package com.electron.rest.entity.projections;

import com.electron.rest.entity.product.Category;

public interface CategoryProjection {
    Long getId();
    String getName();
    Category getParentCategory();
}
