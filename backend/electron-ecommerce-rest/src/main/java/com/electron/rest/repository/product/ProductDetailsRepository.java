package com.electron.rest.repository.product;

import com.electron.rest.entity.product.ProductDetails;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface ProductDetailsRepository extends CrudRepository<ProductDetails, Long> {

    @Modifying
    @Query(value = """
                UPDATE products_details pd
                SET pd.visits = pd.visits + 1
                WHERE pd.id = :productDetailsId
            """, nativeQuery = true)
    void increaseVisitsByOne(@Param("productDetailsId") Long productDetailsId);

}
