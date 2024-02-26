package com.electron.rest.dto.order;

import com.electron.rest.payment.PaymentType;
import com.electron.rest.service.redis.IdempotencyKey;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;


public record OrderRequest(
        @NotNull
        @Valid
        IdempotencyKey idempotencyKey,

        @NotNull
        @Valid
        PaymentInformationDto paymentInformation,

        @NotNull
        @Valid
        DeliveryAddressDto deliveryAddress,

        @NotNull
        @Valid
        PaymentType paymentType
) {
}
