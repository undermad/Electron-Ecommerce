package com.electron.rest.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record SubscriptionEmailRequest(@NotNull @NotBlank @Email String email) {
}
