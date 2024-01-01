package com.electron.rest.security.auth_service;

import com.electron.rest.security.auth_dto.LoginDto;
import com.electron.rest.security.auth_entity.RefreshToken;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseCookie;


public interface RefreshTokenService {
    RefreshToken saveRefreshToken(RefreshToken token);
    String isTokenUpToDate(HttpServletRequest request);
    ResponseCookie getRefreshTokenCookie(LoginDto loginDto);
    void deleteRefreshToken(Long userId);
}
