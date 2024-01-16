package com.electron.rest.security.token.jwt;

import com.electron.rest.token.Token;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class Jwt implements Token {
    private String value;
}