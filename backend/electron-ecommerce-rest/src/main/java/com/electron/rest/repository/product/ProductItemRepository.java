package com.electron.rest.repository.product;

import com.electron.rest.entity.product.ProductItem;
import com.electron.rest.entity.projections.FeatureProjection;
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
    Optional<ProductItemProjection> findMostExpensiveProductByCategoryId(@Param("categoryId") Long categoryId);


    @Query(value = """
            SELECT pi.name as name,
            pi.description as description,
            pi.price as price,
            pi.current_rate as currentRate,
            pi.stock_quantity as stockQuantity,
            pi.category_id as categoryId,
            pd.product_information as productInformation,
            pd.sku as sku,
            pd.id as productDetailsId
            FROM product_item pi
            JOIN products_details pd ON pi.product_details_id = pd.id
            WHERE pi.id = :productId
            """, nativeQuery = true)
    Optional<ProductItemProjection> findProductById(@Param("productId") Long productId);


    @Query(value = """
            SELECT pimg.image_url as img
            FROM products_images pimg
            WHERE pimg.product_details_id = :productDetailsId 
            """, nativeQuery = true)
    List<ProductItemProjection> findProductImages(@Param("productDetailsId") Long productDetailsId);

    @Query(value = """
            SELECT v.name as name,
                   vo.value as value
            FROM product_configuration pc
            JOIN variation_option vo ON pc.variation_option_id = vo.id
            JOIN variation v ON vo.variation_id = v.id
            WHERE pc.product_item_id = :productId
            """, nativeQuery = true)
    List<FeatureProjection> findProductFeatures(@Param("productId") Long productId);


}
