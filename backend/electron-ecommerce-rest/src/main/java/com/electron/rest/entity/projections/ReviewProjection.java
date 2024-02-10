package com.electron.rest.entity.projections;

import java.math.BigDecimal;

public interface ReviewProjection {
    BigDecimal getRate();
    String getReview();
    String getFirstName();
    String getLastName();
}
