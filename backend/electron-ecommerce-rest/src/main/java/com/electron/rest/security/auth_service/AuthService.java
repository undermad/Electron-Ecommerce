package com.electron.rest.security.auth_service;

import com.electron.rest.security.auth_dto.LoginDto;
import com.electron.rest.security.auth_entity.User;
import org.springframework.http.ResponseCookie;

public interface AuthService {
    String login(LoginDto loginDto);
    ResponseCookie generateRefreshTokenCookieFromLoginDto(LoginDto loginDto);
    String generateJwtFromRefreshToken(String refreshToken);
}
