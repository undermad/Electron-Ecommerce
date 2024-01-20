package com.electron.rest.security.token.jwt;

import com.electron.rest.exception.UnauthorizedException;
import com.electron.rest.token.Token;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.util.Date;

@Component
public class JwtProviderImpl implements JwtProvider {

    @Value("${app.jwt-secret}")
    private String jwtSecret;

    @Value("${app-jwt-expiration-millisecond}")
    private String jwtExpirationTime;


    @Override
    public Token generateToken(String email) {
        Date expirationDate = Date.from(Instant.now().plusMillis(Long.parseLong(jwtExpirationTime)));
        return new Jwt(Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(expirationDate)
                .signWith(key())
                .compact());
    }


    private SecretKey key() {
        // decode secret key and return as SecretKey class
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

    @Override
    public String getSubject(Jwt jwt) {
        Claims claims = Jwts.parser()
                .verifyWith(key())
                .build()
                .parseSignedClaims(jwt.getValue())
                .getPayload();

        return claims.getSubject();
    }

    @Override
    public Boolean validateToken(Jwt token) {
        try {
            Jwts.parser()
                    .verifyWith(key())
                    .build()
                    .parse(token.getValue());
        } catch (MalformedJwtException e) {
            throw new UnauthorizedException("Invalid token");
        } catch (ExpiredJwtException e) {
            throw new UnauthorizedException("Expired token");
        } catch (UnsupportedJwtException e) {
            throw new UnauthorizedException("Unsupported JWT token");
        } catch (IllegalArgumentException e) {
            throw new UnauthorizedException("JWT claims string is empty.");
        }

        return true;
    }
}
