package com.electron.rest.security.auth_entity.projections;

public interface UserProjection {
    Long getId();
    String getEmail();
    String getPassword();
    String getAccountStatus();
    Long getPasswordRecoveryTokenId();
}
