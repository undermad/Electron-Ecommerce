package com.electron.rest.entity.product;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "variation_option")
public class VariationOption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "value", nullable = false)
    String value;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "variation_id", nullable = false)
    Variation variation;

    @ManyToMany(mappedBy = "variationOptions")
    Set<ProductItem> productItems;

}
