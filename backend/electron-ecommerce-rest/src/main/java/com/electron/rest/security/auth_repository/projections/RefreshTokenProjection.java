package com.electron.rest.security.auth_repository.projections;

import com.electron.rest.security.auth_entity.User;

import java.time.Instant;

public interface RefreshTokenProjection {
    Long getId();
    String getToken();
    Instant getExpirationDate();
    User user();

}
