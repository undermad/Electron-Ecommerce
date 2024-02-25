package com.electron.rest.exception;

import com.electron.rest.payment.PaymentResult;

public class PaymentDeclinedException extends RuntimeException{
    public PaymentDeclinedException(PaymentResult paymentResult) {
        super(paymentResult.getStatus());
    }
}
