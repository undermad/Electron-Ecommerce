package com.electron.rest.repository.product;

import com.electron.rest.dto.product.PriceRange;
import com.electron.rest.mapper.ProductMapper;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class ProductItemWithFilterRepository {

    private final EntityManager entityManager;

    private final String selectProduct = """
                pi.id as id,
                pi.name as name,
                pi.description as description,
                pi.price as price,
                pi.img_url as imgUrl,
                pi.stock_quantity as stockQuantity,
                pi.category_id as categoryId,
                pi.current_rate as currentRate
            """;
    private final String from = "product_item pi";
    private final String joins = """
                JOIN product_configuration pc
                ON pi.id = pc.product_item_id
                JOIN variation_option vo
                ON pc.variation_option_id = vo.id
                JOIN variation v
                ON v.category_id =
            """;

    @Value("${app-page-size}")
    private Integer pageLimit;


    public ProductItemWithFilterRepository(EntityManager entityManager, ProductMapper productMapper) {
        this.entityManager = entityManager;
    }

    public List<Object[]> findProductByFilters(Map<String, List<String>> filters,
                                               Long categoryId,
                                               PriceRange priceRange,
                                               Integer pageNo) {

        StringBuilder sb = new StringBuilder();
        addQueryBody(filters, categoryId, priceRange, sb, selectProduct);
        addPageNo(pageNo, sb);
        addSemicolon(sb);

        return entityManager.createNativeQuery(sb.toString()).getResultList();
    }

    public List<Object> findTotalElementsFromFilter(Map<String, List<String>> filters,
                                                    Long categoryId,
                                                    PriceRange priceRange) {
        StringBuilder sb = new StringBuilder();
        addSelect(sb);
        sb.append("COUNT(*) ");
        addFrom(sb);
        sb.append("(");
        addQueryBody(filters, categoryId, priceRange, sb, selectProduct);
        sb.append(") as ppvv");
        addSemicolon(sb);

        return entityManager.createNativeQuery(sb.toString()).getResultList();
    }

    private void addQueryBody(Map<String, List<String>> filters, Long categoryId, PriceRange priceRange, StringBuilder sb, String select) {
        addSelect(sb);
        addDistinct(sb);
        addSelectAttributes(select, sb);
        addFrom(sb);
        addFromAttributes(from, sb);
        addJoins(joins, categoryId, sb);
        addWhere(sb);

        if (!filters.isEmpty()) {
            addFilters(filters, sb);
            addAnd(sb);
        }

        addCategory(categoryId, sb);
        addPriceRange(priceRange, sb);

        if (!filters.isEmpty()) {
            addGrouping(sb);
            addHaving(filters.size(), sb);
        }
    }

    private void addFilters(Map<String, List<String>> filters, StringBuilder sb) {
        int counter = 0;
        for (Map.Entry<String, List<String>> entry : filters.entrySet()) {
            String vName = entry.getKey();
            List<String> values = filters.get(vName);
            if (values.isEmpty()) continue;
            sb.append("(v.name = '").append(vName).append("' AND vo.value IN (");
            for (int i = 0; i < values.size(); i++) {
                sb.append("'")
                        .append(values.get(i))
                        .append("'");
                if (i == values.size() - 1) {
                    sb.append(")) ");
                } else
                    sb.append(", ");
            }
            if (counter < filters.size() - 1) {
                sb.append(" OR ");
            }
            counter++;
        }
    }

    private void addSelect(StringBuilder sb) {
        sb.append("SELECT ");
    }

    private void addDistinct(StringBuilder sb) {
        sb.append("DISTINCT ");
    }

    private void addFrom(StringBuilder sb) {
        sb.append("FROM ");
    }

    private void addFromAttributes(String from, StringBuilder sb) {
        sb.append(from).append(" ");
    }

    private void addJoins(String joins, Long categoryId, StringBuilder sb) {
        sb.append(joins).append(" ");
        sb.append(categoryId).append(" ");
    }

    private void addSelectAttributes(String select, StringBuilder sb) {
        sb.append(select).append(" ");
    }

    private void addAnd(StringBuilder sb) {
        sb.append("AND ");
    }

    private void addWhere(StringBuilder sb) {
        sb.append("WHERE ");
    }

    private void addSemicolon(StringBuilder sb) {
        sb.append(";");
    }

    private void addCategory(Long categoryId, StringBuilder sb) {
        sb.append(" (pi.category_id = ").append(categoryId).append(") ");
    }

    private void addPriceRange(PriceRange priceRange, StringBuilder sb) {
        sb.append(" AND (pi.price < ").append(priceRange.maxPrice()).append(") ");
        sb.append(" AND (pi.price > ").append(priceRange.minPrice()).append(") ");
    }

    private void addGrouping(StringBuilder sb) {
        sb.append("GROUP BY pi.id ");
    }

    private void addHaving(int havingSize, StringBuilder sb) {
        sb.append("HAVING COUNT(DISTINCT v.name) = ");
        sb.append(havingSize).append(" ");
    }

    private void addPageNo(Integer pageNo, StringBuilder sb) {
        sb.append("LIMIT ").append(pageLimit).append(" ");
        sb.append("OFFSET ").append(pageNo * pageLimit).append(" ");
    }

}
