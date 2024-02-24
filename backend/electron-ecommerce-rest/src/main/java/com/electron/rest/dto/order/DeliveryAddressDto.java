package com.electron.rest.dto.order;

import com.electron.rest.dto.account.BasketPosition;
import com.electron.rest.entity.account.Address;
import com.electron.rest.service.redis.IdempotencyKey;

import java.util.List;

public record DeliveryAddressDto(
        String recipient,
        Address address) {
}
