package com.electron.rest.repository.product;

import com.electron.rest.entity.product.Category;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface CategoryRepository extends CrudRepository<Category, Long> {

    Optional<Category> findCategoryByName(String name);

}
