package com.electron.rest.security.auth_dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import static com.electron.rest.constants.ErrorMessages.BLANK_FIELD;
import static com.electron.rest.constants.ErrorMessages.PASSWORD_INCORRECT_LENGTH;

public record ChangeForgottenPasswordDto(

        @NotBlank(message = BLANK_FIELD)
        @Size(min = 6, max = 36, message = PASSWORD_INCORRECT_LENGTH)
        String newPassword,

        @NotBlank(message = BLANK_FIELD)
        @Size(min = 6, max = 36, message = PASSWORD_INCORRECT_LENGTH)
        String reNewPassword
) {

}
