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
public class ActivationToken implements Token {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "activation_token", nullable = false)
    private String activationToken;

    @OneToOne(mappedBy = "activationToken")
    private User user;

}
