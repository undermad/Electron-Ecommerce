package com.electron.rest.entity.projections;

import java.time.Instant;

public interface RefreshTokenProjection {
    Long getId();
    String getToken();
    Instant getExpirationDate();
}
