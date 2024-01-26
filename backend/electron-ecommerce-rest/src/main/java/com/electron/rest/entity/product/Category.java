package com.electron.rest.entity.product;

import jakarta.persistence.*;
import lombok.Getter;

import java.util.List;

@Getter
@Entity
@Table(name = "categories", schema = "electron_ecommerce")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", unique = true, nullable = false, length = 32)
    private String name;

    @ManyToOne
    @JoinColumn(name = "parent_category_id")
    private Category parentCategory;

    @OneToMany(mappedBy = "category",fetch = FetchType.LAZY)
    private List<ProductItem> productItems;

    @OneToMany(mappedBy = "category", fetch = FetchType.EAGER)
    private List<Variation> variations;

}
