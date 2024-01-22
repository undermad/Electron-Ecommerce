package com.electron.rest.security.auth_entity.projections;

import java.time.Instant;

public interface PasswordRecoveryTokenProjection {
    Long getId();
    String getToken();
    Instant getExpiryDate();
    Long getUserId();
}
