package com.electron.rest.security.auth_dto;

import com.electron.rest.security.auth_entity.Role;

import java.util.Set;

public record LoginResponse(
        String token,
        String tokenType,
        Set<String> roles,
        String accountStatus) {
    public LoginResponse(String token, Set<String> roles, String accountStatus) {
        this(token, "Bearer", roles, accountStatus);
    }
}
