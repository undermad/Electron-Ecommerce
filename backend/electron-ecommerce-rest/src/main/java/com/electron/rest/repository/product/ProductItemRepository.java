package com.electron.rest.repository.product;

import com.electron.rest.entity.product.ProductItem;
import com.electron.rest.entity.projections.ProductItemProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ProductItemRepository extends CrudRepository<ProductItem, Long> {

    @Query(value = """
            SELECT price
            FROM product_item
            WHERE (category_id, price)
                      IN (SELECT category_id, MAX(price)
                          FROM product_item
                          WHERE category_id = :categoryId);""", nativeQuery = true)
    Optional<ProductItemProjection> findMostExpensiveProductByCategoryId(@Param("categoryId") Long categoryId);

    Page<ProductItem> findByCategory_Id(Long categoryId, Pageable pageable);





}
