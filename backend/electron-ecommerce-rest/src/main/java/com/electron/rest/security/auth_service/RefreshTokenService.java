package com.electron.rest.security.auth_service;

import com.electron.rest.security.auth_dto.LoginDto;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseCookie;


public interface RefreshTokenService {
    String isTokenUpToDate(HttpServletRequest request);
    ResponseCookie getRefreshTokenCookie(LoginDto loginDto);
    ResponseCookie getLogoutCookie(HttpServletRequest request);
    Boolean logoutEverywhere(HttpServletRequest request);
}
