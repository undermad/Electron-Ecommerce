package com.electron.rest.token;

public interface TokenFactory<T> {
    Token generateToken(T value);
}
