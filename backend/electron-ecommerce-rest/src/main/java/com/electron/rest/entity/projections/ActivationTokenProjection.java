package com.electron.rest.entity.projections;

public interface ActivationTokenProjection {
    Long getId();
    String token();
    Long getUserId();
}
