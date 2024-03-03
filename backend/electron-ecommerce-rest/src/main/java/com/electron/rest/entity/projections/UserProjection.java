package com.electron.rest.entity.projections;

public interface UserProjection {
    Long getId();
    String getEmail();
    String getPassword();
    String getAccountStatus();
    Long getPasswordRecoveryTokenId();
    String getFirstName();
    String getLastName();
}
