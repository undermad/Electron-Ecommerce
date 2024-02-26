package com.electron.rest.entity.projections;

public interface DeliveryAddressProjection {
    Long getId();
    String getFullName();
    String getStreetOne();
    String getStreetTwo();
    String getCity();
    String getState();
    String getPostCode();
}
