package com.electron.rest.exception;

public class WrongFileTypeException extends RuntimeException{
    public WrongFileTypeException(String message) {
        super(message);
    }
}
