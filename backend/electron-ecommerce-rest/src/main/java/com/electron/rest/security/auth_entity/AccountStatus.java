package com.electron.rest.security.auth_entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;


@Data
@Entity
@Table(name = "account_statuses", schema = "electron_ecommerce")
public class AccountStatus {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    @Column(name = "status_type")
    private String statusType;

    @OneToMany(mappedBy = "accountStatus", fetch = FetchType.LAZY)
    private List<User> users;


}
