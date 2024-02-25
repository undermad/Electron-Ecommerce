package com.electron.rest.dto.order;

public record PaymentInformationDto(
        String firstName,
        String lastName,
        String cardNumber,
        Integer ccv,
        String expiryDate) {
}
