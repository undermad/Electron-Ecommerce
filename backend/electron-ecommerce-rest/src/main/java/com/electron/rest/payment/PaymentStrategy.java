package com.electron.rest.payment;

public interface PaymentStrategy {
    PaymentResult pay(Double amount);
}
