package com.electron.rest.service.redis;

import jakarta.validation.constraints.NotBlank;

import static com.electron.rest.constants.ErrorMessages.BLANK_FIELD;

public record IdempotencyKey(
        @NotBlank(message = BLANK_FIELD)
        String value) {
}
