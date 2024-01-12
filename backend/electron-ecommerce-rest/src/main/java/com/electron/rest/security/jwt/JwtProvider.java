package com.electron.rest.security.jwt;

import com.electron.rest.exception.UnauthorizedException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.util.Date;

@Component
public class JwtProvider {

    @Value("${app.jwt-secret}")
    private String jwtSecret;

    @Value("${app-jwt-expiration-millisecond}")
    private String jwtExpirationTime;

    private SecretKey key() {
        // decode secret key and return as SecretKey class
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

    public String generateTokenFromAuthentication(Authentication authentication) {
        String email = authentication.getName();
        return generateToken(email);
    }


    public String generateToken(String email){
        Date expirationDate = Date.from(Instant.now().plusMillis(Long.parseLong(jwtExpirationTime)));
        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(expirationDate)
                .signWith(key())
                .compact();
    }


    public String getEmail(String token) {

        Claims claims = Jwts.parser()
                .verifyWith(key())
                .build()
                .parseSignedClaims(token)
                .getPayload();

        return claims.getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(key())
                    .build()
                    .parse(token);
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
