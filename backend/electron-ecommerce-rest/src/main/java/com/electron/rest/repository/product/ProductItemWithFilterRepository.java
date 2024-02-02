package com.electron.rest.repository.product;

import com.electron.rest.dto.product.PriceRange;
import com.electron.rest.mapper.ProductMapper;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class ProductItemWithFilterRepository {

    private final EntityManager entityManager;


    public ProductItemWithFilterRepository(EntityManager entityManager, ProductMapper productMapper) {
        this.entityManager = entityManager;
    }

    public List<Object[]> findProductByFilters(Map<String, List<String>> filters,
                                               Long categoryId,
                                               PriceRange priceRange) {

        int minPrice = priceRange.minPrice();
        int maxPrice = priceRange.maxPrice();
        StringBuilder sb = new StringBuilder();
        sb.append("""
                SELECT DISTINCT\s
                               pi.id as id,
                               pi.name as name,
                               pi.description as description,
                               pi.price as price,
                               pi.sku as sku,
                               pi.img_url as imgUrl,
                               pi.stock_quantity as stockQuantity,
                               pi.category_id as categoryId\s""");
        sb.append("""
                    FROM product_item pi
                    JOIN product_configuration pc
                    ON pi.id = pc.product_item_id
                    JOIN variation_option vo
                    ON pc.variation_option_id = vo.id
                    JOIN variation v
                    ON v.category_id =
                """);
        sb.append(categoryId);

        sb.append("  WHERE ");
        if (!filters.isEmpty()) {
            addFilters(filters, sb);
            sb.append(" AND ");
        }
        addCategoryAndPriceRange(categoryId, minPrice, maxPrice, sb);
        if (filters.isEmpty()) sb.append(";");
        else {
            sb.append("GROUP BY pi.id ")
                    .append("HAVING COUNT(DISTINCT v.name) = ").append(filters.size())
                    .append(";");
        }

        Query query = entityManager.createNativeQuery(sb.toString());
        return query.getResultList();
    }

    private void addCategoryAndPriceRange(Long categoryId, int minPrice, int maxPrice, StringBuilder sb) {
        sb.append(" (pi.category_id = ").append(categoryId).append(") ")
                .append(" AND (pi.price < ").append(maxPrice).append(") ")
                .append(" AND (pi.price > ").append(minPrice).append(") ");
    }

    private void addFilters(Map<String, List<String>> filters, StringBuilder sb) {
        int counter = 0;
        for (Map.Entry<String, List<String>> entry : filters.entrySet()) {
            String vName = entry.getKey();
            List<String> values = filters.get(vName);
            if (values.isEmpty()) continue;
            sb.append(" (v.name = '").append(vName).append("' AND vo.value IN (");
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
    }

}
