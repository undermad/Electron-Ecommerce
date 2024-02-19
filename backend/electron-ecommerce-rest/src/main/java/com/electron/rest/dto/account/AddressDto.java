package com.electron.rest.dto.account;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;

import static com.electron.rest.constants.ErrorMessages.*;

@Builder
public record AddressDto(

        Long id,

        @NotBlank(message = BLANK_FIELD)
        @Size(max = 36, message = MAX_LENGTH_36)
        String streetOne,

        @NotBlank(message = BLANK_FIELD)
        @Size(max = 36, message = MAX_LENGTH_36)
        String streetTwo,

        @NotBlank(message = BLANK_FIELD)
        @Size(max = 36, message = MAX_LENGTH_36)
        String city,

        @NotBlank(message = BLANK_FIELD)
        @Size(max = 36, message = MAX_LENGTH_36)
        String state,

        @NotBlank(message = BLANK_FIELD)
        @Size(max = 6, min = 6, message = POSTCODE_ERROR)
        String postcode
) {
}
