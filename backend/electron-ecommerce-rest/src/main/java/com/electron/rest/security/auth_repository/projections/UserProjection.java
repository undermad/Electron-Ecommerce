package com.electron.rest.security.auth_repository.projections;

public interface UserProjection {
    Long getId();
    String getEmail();
    String getPassword();


}
