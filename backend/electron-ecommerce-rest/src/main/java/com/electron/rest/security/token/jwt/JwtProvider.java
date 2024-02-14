package com.electron.rest.security.token.jwt;

import com.electron.rest.security.token.TokenFactory;

public interface JwtProvider extends TokenFactory<String> {
    String getSubject(Jwt jwt);
    String getSubject(String jwt);
    Boolean validateToken(Jwt token);
}
