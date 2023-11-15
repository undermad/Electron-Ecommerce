package com.electron.rest.exception;

public class ApiException extends RuntimeException {
    public ApiException(String message) {
        super(message);
    }
}
