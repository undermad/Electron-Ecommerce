package com.electron.rest.security.refresh_token;

import com.electron.rest.utility.UnitConverter;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;
import org.springframework.web.util.WebUtils;

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

    public String getRefreshToken(HttpServletRequest request) {
        Cookie cookie = WebUtils.getCookie(request, refreshTokenName);
        return cookie != null ? cookie.getValue() : null;
    }

}
