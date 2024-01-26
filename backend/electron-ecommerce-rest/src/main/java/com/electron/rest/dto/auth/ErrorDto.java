package com.electron.rest.dto.auth;

import java.util.Date;

public record ErrorDto(String message, Date date, String description) {
}