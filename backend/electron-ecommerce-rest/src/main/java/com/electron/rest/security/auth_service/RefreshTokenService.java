package com.electron.rest.security.auth_service;

import com.electron.rest.security.auth_entity.RefreshToken;

import java.time.Instant;

public interface RefreshTokenService {
    RefreshToken generateToken(Long userId);
    boolean isTokenUpToDate(Instant expirationDate, Long tokenId);
}
