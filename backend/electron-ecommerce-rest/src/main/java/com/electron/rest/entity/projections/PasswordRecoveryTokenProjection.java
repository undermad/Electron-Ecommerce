package com.electron.rest.entity.projections;

import java.time.Instant;

public interface PasswordRecoveryTokenProjection {
    Long getId();
    String getToken();
    Instant getExpiryDate();
    Long getUserId();
}
