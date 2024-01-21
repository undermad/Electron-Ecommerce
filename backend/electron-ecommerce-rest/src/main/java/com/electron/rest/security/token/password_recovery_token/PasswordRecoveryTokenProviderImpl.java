package com.electron.rest.security.token.password_recovery_token;

import com.electron.rest.security.auth_entity.PasswordRecoveryToken;
import com.electron.rest.security.auth_entity.User;
import com.electron.rest.security.token.Token;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.UUID;

@Component
public class PasswordRecoveryTokenProviderImpl extends PasswordRecoveryTokenProvider {
    @Value("${app-recovery-token-expiration-millisecond}")
    private String recoveryTokenExpirationTime;

    @Override
    public Token generateToken(User user) {
        return PasswordRecoveryToken.builder()
                .user(user)
                .token(UUID.randomUUID().toString())
                .expiryDate(Instant.now().plusMillis(Long.parseLong(recoveryTokenExpirationTime)))
                .build();
    }
}
