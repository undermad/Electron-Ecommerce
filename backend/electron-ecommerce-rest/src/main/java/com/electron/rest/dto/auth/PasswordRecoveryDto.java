package com.electron.rest.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import static com.electron.rest.constants.ErrorMessages.BLANK_FIELD;
import static com.electron.rest.constants.ErrorMessages.INCORRECT_EMAIL_FORMAT;

public record PasswordRecoveryDto(
        @NotBlank(message = BLANK_FIELD)
        @Email(message = INCORRECT_EMAIL_FORMAT)
        String email) {
}
