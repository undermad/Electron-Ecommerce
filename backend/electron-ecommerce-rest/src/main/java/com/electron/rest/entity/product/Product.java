package com.electron.rest.entity.product;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "products", schema = "electron_ecommerce")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", nullable = false)
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(name = "img_url")
    private String imgUrl;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    private List<ProductItem> productItems;

}
