package com.electron.rest.security.auth_dto;

import jakarta.validation.constraints.*;

import static com.electron.rest.constants.ErrorMessages.*;

public record RegisterDto(
        @NotBlank (message = BLANK_FIELD)
        @Email (message = EMAIL_INCORRECT_FORMAT)
        String email,

        @NotBlank(message = BLANK_FIELD)
        @Size(min = 6, max = 36, message = PASSWORD_INCORRECT_LENGTH)
        String password,

        @NotBlank(message = BLANK_FIELD)
        @Size(min = 6, max = 36, message = PASSWORD_INCORRECT_LENGTH)
        String reEnteredPassword,

        @NotNull (message = NULL)
        Boolean newsletterSubscription
) {}
