package com.electron.rest.security.refresh_token;

import com.electron.rest.security.auth_entity.RefreshToken;
import com.electron.rest.security.auth_entity.User;
import com.electron.rest.utility.UnitConverter;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;
import org.springframework.web.util.WebUtils;

import java.time.Duration;
import java.time.Instant;
import java.util.UUID;

import static com.electron.rest.constants.EndpointsPaths.*;

@Component
public class RefreshTokenProviderImpl implements RefreshTokenProvider {

    @Value("${app-refresh-token-name}")
    private String refreshTokenName;

    @Value("${app-refresh-token-expiration-millisecond}")
    private String refreshTokenExpirationTime;


    @Override
    public ResponseCookie createCookie(String refreshToken) {
        return ResponseCookie
                .from(refreshTokenName, refreshToken)
                .maxAge(Duration.ofMillis(Long.parseLong(refreshTokenExpirationTime)))
                .path(API_V1_AUTH + REFRESH_TOKEN)
                .httpOnly(true)
                .build();
    }

    @Override
    public ResponseCookie createClearCookie() {
        return ResponseCookie
                .from(refreshTokenName, "")
                .maxAge(Duration.ZERO)
                .path(API_V1_AUTH + REFRESH_TOKEN)
                .httpOnly(true)
                .build();
    }

    @Override
    public String getTokenFromHttpRequest(HttpServletRequest request) {
        Cookie cookie = WebUtils.getCookie(request, refreshTokenName);
        return cookie != null ? cookie.getValue() : null;
    }

    @Override
    public RefreshToken generateToken(Long userId) {
        RefreshToken token = new RefreshToken();
        User user = new User();
        user.setId(userId);
        token.setUser(user);
        token.setExpiryDate(Instant.now().plusMillis(Long.parseLong(refreshTokenExpirationTime)));
        token.setToken(UUID.randomUUID().toString());
        return token;
    }


}
