package com.electron.rest.entity.product;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "variation")
public class Variation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "name")
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    Category category;

    @OneToMany(mappedBy = "variation", fetch = FetchType.LAZY)
    private List<VariationOption> variationOptions;
}
