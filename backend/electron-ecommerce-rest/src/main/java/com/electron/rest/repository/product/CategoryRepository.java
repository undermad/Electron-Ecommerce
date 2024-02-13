package com.electron.rest.repository.product;

import com.electron.rest.entity.product.Category;
import com.electron.rest.entity.projections.CategoryProjection;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CategoryRepository extends CrudRepository<Category, Long> {

    Optional<Category> findCategoryByName(String name);

    @Query(value = "SELECT c.id as id FROM categories c WHERE c.name = :category", nativeQuery = true)
    Optional<CategoryProjection> findCategoryIdByName(@Param("category") String category);

    @Query(value = "SELECT c.name as name FROM categories c WHERE c.id = :categoryId", nativeQuery = true)
    Optional<CategoryProjection> findCategoryNameById(@Param("categoryId") Long categoryId);

}
