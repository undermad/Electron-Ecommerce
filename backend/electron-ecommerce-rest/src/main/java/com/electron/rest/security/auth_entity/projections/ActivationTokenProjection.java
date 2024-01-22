package com.electron.rest.security.auth_entity.projections;

public interface ActivationTokenProjection {
    Long getId();
    String token();
    Long getUserId();
}
