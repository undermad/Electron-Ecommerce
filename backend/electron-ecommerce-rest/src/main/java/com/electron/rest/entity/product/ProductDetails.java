package com.electron.rest.entity.product;

import jakarta.persistence.*;
import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.Set;

@Getter
@Entity()
@Table(name = "products_details")
public class ProductDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "product_information", nullable = false)
    private String productInformation;

    @ElementCollection
    @CollectionTable(
            name = "products_images",
            joinColumns = @JoinColumn(name = "product_details_id"))
    @Column(name = "image_url")
    private Set<String> images;

    @OneToOne(mappedBy = "productDetails", fetch = FetchType.LAZY)
    private ProductItem productItem;

    @CreationTimestamp
    private Instant createdOn;

    @UpdateTimestamp
    private Instant updatedOn;

}
