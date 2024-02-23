package com.electron.rest.entity.orders;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;

@Entity(name = "delivery_addresses")
public class DeliveryAddress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreationTimestamp
    private Instant createdOn;

    @UpdateTimestamp
    private Instant updatedOn;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "street_one", nullable = false)
    private String streetOne;

    @Column(name = "street_two")
    private String streetTwo;

    @Column(name = "city", nullable = false)
    private String city;

    @Column(name = "state")
    private String state;

    @Column(name = "postcode", nullable = false)
    private String postcode;

    @OneToOne(fetch = FetchType.LAZY)
    private Order order;



}
