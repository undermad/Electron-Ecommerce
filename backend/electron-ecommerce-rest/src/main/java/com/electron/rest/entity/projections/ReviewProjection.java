package com.electron.rest.entity.projections;

import java.math.BigDecimal;
import java.time.Instant;

public interface ReviewProjection {
    BigDecimal getRate();
    String getReview();
    String getFirstName();
    String getLastName();
    Instant getCreatedOn();
}
