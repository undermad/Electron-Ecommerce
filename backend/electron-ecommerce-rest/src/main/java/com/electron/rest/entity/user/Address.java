package com.electron.rest.entity.user;

import jakarta.persistence.*;


@Entity(name = "addresses")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


}
