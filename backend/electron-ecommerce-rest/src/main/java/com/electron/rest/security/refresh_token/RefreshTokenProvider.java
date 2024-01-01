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

import java.time.Instant;
import java.util.UUID;

@Component
public class RefreshTokenProvider {

    @Value("${app-refresh-token-name}")
    private String refreshTokenName;

    @Value("${app-refresh-token-expiration-millisecond}")
    private String refreshTokenExpirationTime;


    public ResponseCookie createRefreshTokenCookie(String refreshToken) {
        return ResponseCookie
                .from(refreshTokenName, refreshToken)
                .maxAge(UnitConverter.millisecondsToSeconds(Long.parseLong(refreshTokenExpirationTime)))
                .path("/api/v1/auth/refreshtoken")
                .httpOnly(true)
                .build();
    }

    public String getRefreshTokenFromHttpRequest(HttpServletRequest request) {
        Cookie cookie = WebUtils.getCookie(request, refreshTokenName);
        return cookie != null ? cookie.getValue() : null;
    }

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
