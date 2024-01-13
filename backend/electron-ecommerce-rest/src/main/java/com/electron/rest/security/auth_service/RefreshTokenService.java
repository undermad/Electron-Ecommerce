package com.electron.rest.security.auth_service;

import com.electron.rest.security.auth_dto.LoginDto;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseCookie;


public interface RefreshTokenService {
    Boolean isTokenUpToDate(String token);
    ResponseCookie getRefreshTokenCookie(LoginDto loginDto, Boolean remember);
    ResponseCookie getLogoutCookie(String refreshToken);
    void logoutEverywhere(String jwt);
}
