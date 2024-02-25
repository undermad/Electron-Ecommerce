package com.electron.rest.payment;

import org.springframework.stereotype.Component;

@Component(CreditCardPaymentStrategy.BEAN_ID)
public class CreditCardPaymentStrategy implements PaymentStrategy {
    public static final String BEAN_ID = "CreditCard";

    @Override
    public PaymentResult pay(Double amount) {
//        CONSIDER ADDING ACTUAL PAYMENT METHOD
//        IF YOU DECIDE TO USE IT IN COMMERCIAL PURPOSES
        return PaymentResult.SUCCESSFUL;
    }
}
