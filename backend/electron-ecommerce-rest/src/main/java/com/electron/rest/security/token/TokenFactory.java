package com.electron.rest.security.token;

import com.electron.rest.security.token.Token;

public interface TokenFactory<T> {
    Token generateToken(T value);
}
