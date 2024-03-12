package com.electron.rest.email;

import com.electron.rest.entity.orders.Order;

import java.util.Map;

public class OrderConfirmationEmailSettings implements EmailSettingsFactory<Order> {
    @Override
    public EmailSettings createSettings(Order order) {
        return EmailSettings.builder()
                .receiver(order.getUser().getEmail())
                .subject("Electron - Order confirmation")
                .template("order-confirmation")
                .variables(Map.of(
                        "orderId", order.getId(),
                        "totalPrice", order.getTotalPrice()
                ))
                .build();
    }
}
