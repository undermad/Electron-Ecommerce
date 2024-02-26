package com.electron.rest.entity.projections;

import java.math.BigDecimal;

public interface OrderProjection {

    Long getId();
    String getStatus();
    Integer getTotalItems();
    BigDecimal getTotalPrice();
    Long getUserId();
    Long getDeliveryAddressId();
    Long getPaymentInformationId();
    String getImgUrl();
}
//da.street_one as streetOne,
//da.street_two as streetTwo,
//da.city as city,
//da.postcode as postcode,
//da.state as state