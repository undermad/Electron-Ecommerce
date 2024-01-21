package com.electron.rest.security.auth_entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.List;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users", schema = "electron_ecommerce")
public class User {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "password", nullable = false, length = 64)
    private String password;

    @Column(name = "first_name", nullable = false, length = 36)
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 36)
    private String lastName;

    @Column(name = "newsletter", nullable = false)
    private Boolean newsletterSubscription;

    @CreationTimestamp
    private Instant createdOn;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_status_id", nullable = false)
    private AccountStatus accountStatus;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    private Set<Role> roles;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<RefreshToken> refreshTokens;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "activation_token_id", referencedColumnName = "id")
    private ActivationToken activationToken;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "password_recovery_token_id", referencedColumnName = "id")
    private PasswordRecoveryToken passwordRecoveryToken;


}
