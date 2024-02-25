package com.electron.rest.entity.product;

import com.electron.rest.entity.orders.OrderItem;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.Set;

@Getter
@Entity
@Setter
@Table(name = "product_item")
public class ProductItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreationTimestamp
    private Instant createdOn;

    @UpdateTimestamp
    private Instant updatedOn;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "img_url")
    private String imgUrl;

    @Column(name = "stock_quantity", nullable = false, columnDefinition = "int default 0")
    private Integer stockQuantity;

    @Column(name = "price", precision = 10, scale = 2)
    private BigDecimal price;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @ManyToMany
    @JoinTable(name = "product_configuration",
            joinColumns = @JoinColumn(name = "product_item_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "variation_option_id", referencedColumnName = "id"))
    private Set<VariationOption> variationOptions;

    @OneToMany(mappedBy = "productItem", fetch = FetchType.LAZY)
    private List<Review> reviews;

    @Column(name = "current_rate", precision = 2, scale = 1)
    private BigDecimal overallRate;

    @OneToOne
    @JoinColumn(name = "product_details_id", unique = true, referencedColumnName = "id")
    private ProductDetails productDetails;

    @OneToMany(mappedBy = "productItem", fetch = FetchType.LAZY)
    private List<OrderItem> orderItems;


}
