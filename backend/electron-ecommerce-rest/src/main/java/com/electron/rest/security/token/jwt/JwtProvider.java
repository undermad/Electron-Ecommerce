package com.electron.rest.security.token.jwt;

import com.electron.rest.token.TokenFactory;

public abstract class JwtProvider implements TokenFactory<String> {
    public abstract String getSubject(Jwt jwt);
    public abstract Boolean validateToken(Jwt token);
}
