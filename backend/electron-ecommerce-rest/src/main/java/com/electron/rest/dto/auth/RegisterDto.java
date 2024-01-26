package com.electron.rest.dto.auth;

import jakarta.validation.constraints.*;

import static com.electron.rest.constants.ErrorMessages.*;

public record RegisterDto(

        @NotBlank
        @Size(max = 36, message = MAX_LENGTH_36)
        String firstName,

        @NotBlank
        @Size(max = 36, message = MAX_LENGTH_36)
        String lastName,

        @NotBlank (message = BLANK_FIELD)
        @Email (message = INCORRECT_EMAIL_FORMAT)
        String email,

        @NotBlank(message = BLANK_FIELD)
        @Size(min = 6, max = 36, message = PASSWORD_INCORRECT_LENGTH)
        String password,

        @NotBlank(message = BLANK_FIELD)
        @Size(min = 6, max = 36, message = PASSWORD_INCORRECT_LENGTH)
        String rePassword,

        @NotNull (message = NULL)
        Boolean newsletterSubscription
) {}
