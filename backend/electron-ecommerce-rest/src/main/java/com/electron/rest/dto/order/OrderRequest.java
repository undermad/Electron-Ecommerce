package com.electron.rest.dto.order;

import com.electron.rest.payment.PaymentType;
import com.electron.rest.service.redis.IdempotencyKey;


public record OrderRequest(
        IdempotencyKey idempotencyKey,
        PaymentInformationDto paymentInformation,
        DeliveryAddressDto deliveryAddress,
        PaymentType paymentType
) {
}
