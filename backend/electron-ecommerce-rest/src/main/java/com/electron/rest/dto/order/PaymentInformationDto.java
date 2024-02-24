package com.electron.rest.dto.order;

import jakarta.persistence.Column;

public record PaymentInformationDto(
        String firstName,
        String lastName,
        String cardNumber,
        Integer ccv,
        String expiryDate) {
}
