package com.electron.rest.entity.product;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.Set;

@Entity
@Table(name = "product_item")
public class ProductItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "sku", nullable = false, unique = true)
    private String sku;

    @Column(name = "img_url")
    private String imgUrl;

    @Column(name = "stock_quantity", nullable = false, columnDefinition = "int default 0")
    private Integer stockQuantity;

    @Column(name = "price", precision = 10, scale = 2)
    private BigDecimal price;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @ManyToMany
    @JoinTable(name = "product_configuration",
            joinColumns = @JoinColumn(name = "product_item_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "variation_option_id", referencedColumnName = "id"))
    private Set<VariationOption> variationOptions;


}
