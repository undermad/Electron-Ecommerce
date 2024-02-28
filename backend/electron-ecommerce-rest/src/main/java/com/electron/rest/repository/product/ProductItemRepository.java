package com.electron.rest.repository.product;

import com.electron.rest.entity.product.ProductItem;
import com.electron.rest.entity.projections.FeatureProjection;
import com.electron.rest.entity.projections.ProductItemProjection;
import org.springframework.data.jpa.repository.Modifying;
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

    @Query(value = """
            SELECT pi.stock_quantity as stockQuantity 
            FROM product_item pi 
            WHERE pi.id = :productItemId
            """, nativeQuery = true)
    Optional<ProductItemProjection> findProductItemQuantity(@Param("productItemId") Long productItemId);

    @Query(value = """
                    SELECT pi.id as id,
                        pi.name as name,
                        pi.description as description,
                        pi.price as price,
                        pi.img_url as imgUrl,
                        pi.stock_quantity as stockQuantity,
                        pi.category_id as categoryId,
                        pi.current_rate as currentRate,
                        c.name as categoryName
                        FROM product_item pi
                        JOIN categories c ON pi.category_id = c.id
                        WHERE pi.id = :productId
            """, nativeQuery = true)
    Optional<ProductItemProjection> findProductListItem(@Param("productId") Long productId);

    @Modifying
    @Query(value = """
                UPDATE product_item pi
                SET pi.stock_quantity = pi.stock_quantity - :quantity
                WHERE pi.stock_quantity >= :quantity
                AND pi.id = :productId
            """, nativeQuery = true)
    void reduceQuantity(@Param("quantity") Integer quantity, @Param("productId") Long productId);

    @Modifying
    @Query(value = """
                UPDATE product_item pi
                SET pi.stock_quantity = pi.stock_quantity + :quantity
                WHERE pi.id = :productItemId
            """, nativeQuery = true)
    void increaseQuantity(@Param("quantity") Integer quantity, @Param("productItemId") Long productItemId);

    @Query(value = "SELECT pi.id as id, pi.stock_quantity as stockQuantity, pi.price as price FROM product_item pi WHERE pi.id = :productId", nativeQuery = true)
    Optional<ProductItemProjection> findQuantityAndPrice(@Param("productId") Long productId);


    @Query(value = """
                SELECT pi.id as id,
                pi.name as name,
                pi.description as description,
                pi.price as price,
                pi.img_url as imgUrl,
                pi.stock_quantity as stockQuantity,
                pi.category_id as categoryId,
                pi.current_rate as currentRate,
                c.name as categoryName
                FROM product_item pi
                JOIN categories c ON pi.category_id = c.id
                WHERE pi.name LIKE CONCAT('%', :query, '%')
                LIMIT 10 OFFSET :offset
            """, nativeQuery = true)
    List<ProductItemProjection> findProductByName(@Param("query") String query, @Param("offset") Integer offset);

    @Query(value = """
                SELECT COUNT(*) as totalRows
                FROM product_item pi
                WHERE pi.name LIKE CONCAT('%', :query,'%')
            """, nativeQuery = true)
    int findProductTotalRow(@Param("query") String query);



}
