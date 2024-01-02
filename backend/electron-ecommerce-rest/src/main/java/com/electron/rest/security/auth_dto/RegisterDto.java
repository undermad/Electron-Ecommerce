package com.electron.rest.security.auth_dto;

public record RegisterDto(String email, String password, boolean newsletterSubscription) {}
