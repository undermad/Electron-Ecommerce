package com.electron.rest.entity.product;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.Set;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "variation_option")
public class VariationOption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "value", nullable = false)
    String value;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "variation_id", nullable = false)
    Variation variation;

    @ManyToMany(mappedBy = "variationOptions", fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    Set<ProductItem> products;

    @CreationTimestamp
    private Instant createdOn;

    @UpdateTimestamp
    private Instant updatedOn;

    public void addProduct(ProductItem productItem) {
        this.products.add(productItem);
    }





}
