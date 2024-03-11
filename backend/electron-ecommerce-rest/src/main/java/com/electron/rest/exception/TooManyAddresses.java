package com.electron.rest.exception;

public class TooManyAddresses extends RuntimeException{
    public TooManyAddresses(String message) {
        super(message);
    }
}
