package com.electron.rest.security.token.jwt;

import com.electron.rest.token.TokenFactory;

public interface JwtProvider extends TokenFactory<String> {
    String getSubject(Jwt jwt);
    Boolean validateToken(Jwt token);
}
