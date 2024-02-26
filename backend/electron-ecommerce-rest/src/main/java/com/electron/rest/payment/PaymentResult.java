package com.electron.rest.payment;

import lombok.Getter;

@Getter
public enum PaymentResult {
    SUCCESSFUL("Successful"),
    FAILED("Failed"),
    PROCESSING("Processing");

    private final String status;

    PaymentResult(String status) {
        this.status = status;
    }

}
