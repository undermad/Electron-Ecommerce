package com.electron.rest.security.auth_service;

import com.electron.rest.security.auth_dto.JwtResponse;
import com.electron.rest.security.auth_dto.LoginDto;
import com.electron.rest.security.auth_dto.RegisterDto;
import com.electron.rest.security.auth_dto.RegisterResponse;

public interface AuthService {
    JwtResponse login(LoginDto loginDto);
    JwtResponse refreshJwt(String refreshToken);
    RegisterResponse register(RegisterDto registerDto);
}
