package com.electron.rest.dto.order;

import com.electron.rest.dto.account.BasketPosition;
import com.electron.rest.service.redis.IdempotencyKey;

import java.util.List;

public record OrderRequest(
        PaymentInformationDto paymentInformation,
        DeliveryAddressDto deliveryAddress,
        IdempotencyKey idempotencyKey,
        List<BasketPosition> basket) {
}
