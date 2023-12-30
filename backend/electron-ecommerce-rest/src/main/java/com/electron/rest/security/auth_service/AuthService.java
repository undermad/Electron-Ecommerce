package com.electron.rest.security.auth_service;

import com.electron.rest.security.auth_dto.LoginDto;

public interface AuthService {
    String login(LoginDto loginDto);
    String refreshJwt(String refreshToken);
}
