package com.electron.rest.security.auth_dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import static com.electron.rest.constants.ErrorMessages.BLANK_FIELD;
import static com.electron.rest.constants.ErrorMessages.EMAIL_INCORRECT_FORMAT;

public record PasswordRecoveryDto(
        @NotBlank(message = BLANK_FIELD)
        @Email(message = EMAIL_INCORRECT_FORMAT)
        String email) {
}
