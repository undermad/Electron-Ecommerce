package com.electron.rest.dto.product;

import java.math.BigDecimal;

public record ReviewDto(BigDecimal rate, String review) {}