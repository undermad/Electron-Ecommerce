package com.electron.rest.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import static com.electron.rest.constants.ErrorMessages.*;

public record LoginDto(

        @NotBlank(message = BLANK_FIELD)
        @Email(message = INCORRECT_EMAIL_FORMAT)
        String email,

        @NotBlank(message = BLANK_FIELD)
        @Size(max = 36, message = MAX_LENGTH_36)
        String password
) {}
