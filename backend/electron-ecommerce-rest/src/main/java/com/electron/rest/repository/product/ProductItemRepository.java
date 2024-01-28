package com.electron.rest.repository.product;

import com.electron.rest.entity.product.ProductItem;
import com.electron.rest.entity.projections.ProductItemProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductItemRepository extends CrudRepository<ProductItem, Long> {

    @Query(value = """
            SELECT price
            FROM product_item
            WHERE (category_id, price)
                      IN (SELECT category_id, MAX(price)
                          FROM product_item
                          WHERE category_id = :categoryId);""", nativeQuery = true)
    Optional<ProductItemProjection> findCheapestProductByCategoryId(@Param("categoryId") Long categoryId);

    @Query("""
            SELECT pi FROM ProductItem pi
            JOIN pi.variationOptions vo
            WHERE vo.value IN :variationValues
            AND pi.category.id = :categoryId
            GROUP BY pi
            HAVING COUNT(DISTINCT vo.value) = :variationCount""")
    Page<ProductItem> findByAllVariationsAndCategory(@Param("variationValues") List<String> variationValues,
                                                     @Param("variationCount") Long variationCount,
                                                     @Param("categoryId") Long categoryId,
                                                     Pageable pageable);

    Page<ProductItem> findByCategory_Id(Long categoryId, Pageable pageable);





}
