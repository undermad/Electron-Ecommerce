package com.electron.rest.entity.user;

import com.electron.rest.entity.account.Address;
import com.electron.rest.entity.account.BasketItem;
import com.electron.rest.entity.orders.CheckoutItem;
import com.electron.rest.entity.orders.Order;
import com.electron.rest.entity.product.Review;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

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

    @UpdateTimestamp
    private Instant updatedOn;

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

    @OneToOne(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    private ActivationToken activationToken;

    @OneToOne(mappedBy = "user", fetch = FetchType.LAZY)
    private PasswordRecoveryToken passwordRecoveryToken;

    @OneToMany(mappedBy = "user")
    private List<Review> reviews;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
    private List<BasketItem> basketItem;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Address> address;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<CheckoutItem> checkoutItems;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Order> orders;


}
