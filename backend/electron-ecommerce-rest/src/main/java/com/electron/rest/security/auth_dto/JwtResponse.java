package com.electron.rest.security.auth_dto;

public record JwtResponse(String token, String tokenType) {
    public JwtResponse(String accessToken){
        this(accessToken, "Bearer");
    }
}
