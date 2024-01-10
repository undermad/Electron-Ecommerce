package com.electron.rest.security.refresh_token;

import com.electron.rest.security.auth_entity.RefreshToken;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseCookie;

public interface RefreshTokenProvider {
    ResponseCookie createCookie(String refreshToken);
    String getTokenFromHttpRequest(HttpServletRequest request);
    RefreshToken generateToken(Long userId);
    ResponseCookie createClearCookie();
}
