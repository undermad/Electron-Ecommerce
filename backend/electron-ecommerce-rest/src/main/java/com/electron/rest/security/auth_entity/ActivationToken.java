package com.electron.rest.security.auth_entity;


import com.electron.rest.token.Token;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "activation_tokens", schema = "electron_ecommerce")
public class ActivationToken implements Token {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "token", nullable = false)
    private String token;

    @OneToOne(mappedBy = "activationToken", fetch = FetchType.LAZY)
    private User user;

}
