package com.electron.rest.entity.projections;

public interface AddressProjection {
    Long getId();
    String getStreetOne();
    String getStreetTwo();
    String getCity();
    String getState();
    String getPostcode();
    String getUserId();
}
