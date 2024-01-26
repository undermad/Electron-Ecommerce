package com.electron.rest.dto.auth;

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
