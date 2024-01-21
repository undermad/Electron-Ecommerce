package com.electron.rest.security.auth_entity;

import com.electron.rest.security.token.Token;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Entity
@Table(name = "password_recovery_tokens", schema = "electron_ecommerce")
public class PasswordRecoveryToken implements Token {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "token", unique = true, nullable = false)
    private String token;

    @Column(name = "expiry_date", nullable = false)
    private Instant expiryDate;

    @OneToOne(mappedBy = "passwordRecoveryToken", fetch = FetchType.LAZY)
    private User user;


}
