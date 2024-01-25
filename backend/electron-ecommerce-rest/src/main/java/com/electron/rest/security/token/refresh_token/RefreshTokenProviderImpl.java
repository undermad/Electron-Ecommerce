package com.electron.rest.security.token.refresh_token;

import com.electron.rest.entity.user.RefreshToken;
import com.electron.rest.entity.user.User;
import com.electron.rest.security.token.Token;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.Instant;
import java.util.UUID;

import static com.electron.rest.constants.EndpointsPaths.API_V1_AUTH;
import static com.electron.rest.constants.EndpointsPaths.REFRESH_TOKEN;

@Component
public class RefreshTokenProviderImpl extends RefreshTokenProvider {


    @Value("${app-refresh-token-name}")
    private String refreshTokenCookieName;

    @Value("${app-refresh-token-expiration-millisecond}")
    private String refreshTokenExpirationTime;

    @Override
    public ResponseCookie createCookie(String refreshToken) {
        return ResponseCookie
                .from(refreshTokenCookieName, refreshToken)
                .maxAge(Duration.ofMillis(Long.parseLong(refreshTokenExpirationTime)))
                .path(API_V1_AUTH + REFRESH_TOKEN)
                .httpOnly(true)
                .build();
    }

    @Override
    public ResponseCookie createClearCookie() {
        return ResponseCookie
                .from(refreshTokenCookieName, "")
                .maxAge(Duration.ZERO)
                .path(API_V1_AUTH + REFRESH_TOKEN)
                .httpOnly(true)
                .build();
    }

    @Override
    public Token generateToken(Long userId) {
        User user = new User();
        user.setId(userId);
        return RefreshToken.builder()
                .user(user)
                .token(UUID.randomUUID().toString())
                .expiryDate(Instant.now().plusMillis(Long.parseLong(refreshTokenExpirationTime)))
                .build();
    }
}
