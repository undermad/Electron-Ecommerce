package com.electron.rest.security.auth_service;

import com.electron.rest.security.auth_dto.*;

public interface AuthService {
    LoginResponse login(LoginDto loginDto);
    JwtResponse refreshToken(String refreshToken);
    RegisterResponse register(RegisterDto registerDto);
}
