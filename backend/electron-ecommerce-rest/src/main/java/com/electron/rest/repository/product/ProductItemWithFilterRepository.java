package com.electron.rest.repository.product;

import com.electron.rest.mapper.ProductMapper;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class ProductItemWithFilterRepository {

    private EntityManager entityManager;
    private ProductMapper productMapper;

    public ProductItemWithFilterRepository(EntityManager entityManager, ProductMapper productMapper) {
        this.entityManager = entityManager;
        this.productMapper = productMapper;
    }


//    SELECT DISTINCT pi.*
//    FROM product_item pi
//    JOIN product_configuration pc
//    ON pi.id = pc.product_item_id
//    JOIN variation_option vo
//    ON pc.variation_option_id = vo.id
//    JOIN variation v
//    ON v.category_id = 1
//    WHERE (v.name = 'Brand' AND vo.value IN ('CORSAIR', 'KINGSTON'))
//    OR (v.name = 'Module type' AND vo.value IN ('DDR4'))
//    AND (pi.category_id = 1)
//    GROUP BY pi.id
//    HAVING COUNT(DISTINCT v.name) = 2;


    public List<Object[]> findProductByFilters(Map<String, List<String>> filters, Long categoryId) {
        StringBuilder sb = new StringBuilder("""
                SELECT DISTINCT 
                           pi.id as id,
                           pi.name as name,
                           pi.description as description,
                           pi.price as price,
                           pi.sku as sku,
                           pi.img_url as imgUrl,
                           pi.stock_quantity as stockQuantity
                    FROM product_item pi
                    JOIN product_configuration pc
                    ON pi.id = pc.product_item_id
                    JOIN variation_option vo
                    ON pc.variation_option_id = vo.id
                    JOIN variation v
                    ON v.category_id = 1 WHERE
                """);

        int counter = 0;
        for (Map.Entry<String, List<String>> entry : filters.entrySet()) {
            String vName = entry.getKey();
            sb.append(" (v.name = 'Brand' AND vo.value IN (");
            List<String> values = filters.get(vName);
            for (int i = 0; i < values.size(); i++) {
                sb.append("'")
                        .append(values.get(i))
                        .append("'");
                if (i == values.size() - 1) {
                    sb.append("))");
                } else
                    sb.append(", ");
            }
            if (counter < filters.size() - 1) {
                sb.append(" OR ");
            }
            counter++;
        }
        sb.append(" AND (pi.category_id = ")
                .append(categoryId)
                .append(") ")
                .append("GROUP BY pi.id ")
                .append("HAVING COUNT(DISTINCT v.name) = ")
                .append(filters.size())
                .append(";");

        Query query = entityManager.createNativeQuery(sb.toString());
        List<Object[]> result = query.getResultList();

        result.forEach(record -> {
            for(int i = 0; i<record.length; i++){
                System.out.println(record[i]);
            }
        });
        return result;
    }

}
