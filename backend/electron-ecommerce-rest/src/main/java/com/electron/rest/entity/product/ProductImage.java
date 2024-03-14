package com.electron.rest.entity.product;

import jakarta.persistence.*;

@Entity
@Table(name = "products_images")
public class ProductImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "image_url")
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "product_details_id")
    private ProductDetails productDetails;
}