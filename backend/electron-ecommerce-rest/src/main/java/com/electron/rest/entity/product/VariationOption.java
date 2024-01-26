package com.electron.rest.entity.product;

import jakarta.persistence.*;
import lombok.Getter;

import java.util.Set;

@Getter
@Entity
@Table(name = "variation_option")
public class VariationOption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "value", nullable = false)
    String value;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "variation_id", nullable = false)
    Variation variation;

    @ManyToMany(mappedBy = "variationOptions", fetch = FetchType.LAZY)
    Set<ProductItem> productItems;

}
