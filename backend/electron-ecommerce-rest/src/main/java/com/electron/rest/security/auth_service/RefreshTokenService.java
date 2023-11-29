package com.electron.rest.security.auth_service;

import com.electron.rest.security.auth_entity.RefreshToken;
import jakarta.servlet.http.HttpServletRequest;


public interface RefreshTokenService {
    RefreshToken generateToken(Long userId);
    String isTokenUpToDate(HttpServletRequest request);
    void deleteRefreshToken(Long userId);
}
