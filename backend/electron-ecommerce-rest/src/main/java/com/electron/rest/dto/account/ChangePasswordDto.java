package com.electron.rest.dto.account;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import static com.electron.rest.constants.ErrorMessages.BLANK_FIELD;
import static com.electron.rest.constants.ErrorMessages.PASSWORD_INCORRECT_LENGTH;

public record ChangePasswordDto(
        @NotBlank(message = BLANK_FIELD)
        @Size(min = 6, max = 36, message = PASSWORD_INCORRECT_LENGTH)
        String oldPassword,

        @NotBlank(message = BLANK_FIELD)
        @Size(min = 6, max = 36, message = PASSWORD_INCORRECT_LENGTH)
        String newPassword,

        @NotBlank(message = BLANK_FIELD)
        @Size(min = 6, max = 36, message = PASSWORD_INCORRECT_LENGTH)
        String reNewPassword
) {
}
