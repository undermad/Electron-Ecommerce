package com.electron.rest.security.auth_dto;

import com.electron.rest.security.auth_entity.Role;

import java.util.Set;

public record LoginResponse(
        String token,
        String tokenType,
        Set<String> roles) {
    public LoginResponse(String accessToken, Set<String> roles) {
        this(accessToken, "Bearer", roles);
    }
}
