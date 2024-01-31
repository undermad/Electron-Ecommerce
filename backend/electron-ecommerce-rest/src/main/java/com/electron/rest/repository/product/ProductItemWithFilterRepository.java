package com.electron.rest.repository.product;

import com.electron.rest.mapper.ProductMapper;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Repository
public class ProductItemWithFilterRepository {

    private final EntityManager entityManager;
    private final String fromTables = """
                FROM product_item pi
                JOIN product_configuration pc
                ON pi.id = pc.product_item_id
                JOIN variation_option vo
                ON pc.variation_option_id = vo.id
                JOIN variation v
                ON v.category_id =
            """;


    public ProductItemWithFilterRepository(EntityManager entityManager, ProductMapper productMapper) {
        this.entityManager = entityManager;
    }

    public List<Object[]> findProductByFilters(Map<String, List<String>> filters,
                                               Long categoryId,
                                               int minPrice,
                                               int maxPrice,
                                               Integer pageNo) {

        String queryObjectSelect = """
                SELECT DISTINCT\s
                               pi.id as id,
                               pi.name as name,
                               pi.description as description,
                               pi.price as price,
                               pi.sku as sku,
                               pi.img_url as imgUrl,
                               pi.stock_quantity as stockQuantity\s""";

        StringBuilder sb = new StringBuilder();
        sb.append(queryObjectSelect);
        sb.append(fromTables);
        sb.append(categoryId).append("  WHERE ");
        addFilters(filters, sb);
        addCategoryAndPriceRange(categoryId, minPrice, maxPrice, sb);
        sb.append("GROUP BY pi.id ")
                .append("HAVING COUNT(DISTINCT v.name) = ").append(filters.size())
                .append(" LIMIT 10 OFFSET ").append(pageNo * 10)
                .append(";");

        Query query = entityManager.createNativeQuery(sb.toString());
        return query.getResultList();
    }

    private static void addCategoryAndPriceRange(Long categoryId, int minPrice, int maxPrice, StringBuilder sb) {
        sb.append(" AND (pi.category_id = ").append(categoryId).append(") ")
                .append(" AND (pi.price < ").append(maxPrice).append(") ")
                .append(" AND (pi.price > ").append(minPrice).append(") ");
    }

    private static void addFilters(Map<String, List<String>> filters, StringBuilder sb) {
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

    public List<Object[]> countRecords(Map<String, List<String>> filters,
                                        Long categoryId,
                                        int minPrice,
                                        int maxPrice) {
        String queryCountSelect = "SELECT COUNT(*) as totalElements, pi.category_id as id ";
        StringBuilder sb = new StringBuilder();
        sb.append(queryCountSelect);
        sb.append(fromTables);
        sb.append(categoryId).append("  WHERE ");
        addFilters(filters, sb);
        addCategoryAndPriceRange(categoryId, minPrice, maxPrice, sb);
        sb.append(";");
        Query query = entityManager.createNativeQuery(sb.toString());
        return query.getResultList();

    }


}
