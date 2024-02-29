package com.electron.rest.repository.product;

import com.electron.rest.entity.product.Review;
import com.electron.rest.entity.projections.ReviewProjection;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepository extends CrudRepository<Review, Long> {

    @Query(value = """
            SELECT r.rate as rate,
                r.review as review,
                u.first_name as firstName,
                u.last_name as lastName,
                r.created_on as createdOn
            FROM reviews r JOIN users u ON r.user_id = u.id 
            WHERE product_item_id = :productId
            """,nativeQuery = true)
    List<ReviewProjection> findAllByProductId(@Param("productId") Long productId);

    @Query(value = """
            SELECT COUNT(*) 
            FROM reviews r 
            WHERE r.product_item_id = :productId
            """, nativeQuery = true)
    int count(@Param("productId") Long productId);
}
