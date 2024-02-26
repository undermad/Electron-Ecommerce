package com.electron.rest.dto.order;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import static com.electron.rest.constants.ErrorMessages.*;

public record PaymentInformationDto(

        @NotBlank(message = BLANK_FIELD)
        @Size(min = 2, max = 36, message = MAX_LENGTH_36)
        String firstName,

        @NotBlank(message = BLANK_FIELD)
        @Size(min = 2, max = 36, message = MAX_LENGTH_36)
        String lastName,

        @Size(min = 16, max = 20, message = WRONG_CREDIT_CARD_LENGTH)
        @NotBlank(message = BLANK_FIELD)
        String cardNumber,

        @Min(value = 100, message = LENGTH_MUST_BE_3)
        @Max(value = 999, message = LENGTH_MUST_BE_3)
        Integer ccv,

        @NotBlank(message = BLANK_FIELD)
        @Size(min = 4, max = 5, message = WRONG_CREDIT_CARD_EXPIRY_DATE)
        String expiryDate

) {
}
