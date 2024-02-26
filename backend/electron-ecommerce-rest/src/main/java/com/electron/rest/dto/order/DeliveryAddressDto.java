package com.electron.rest.dto.order;

import com.electron.rest.dto.account.AddressDto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import static com.electron.rest.constants.ErrorMessages.BLANK_FIELD;

public record DeliveryAddressDto(

        @NotBlank(message = BLANK_FIELD)
        String recipient,

        @NotNull
        AddressDto address

) {
}
