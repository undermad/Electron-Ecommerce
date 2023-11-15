package com.electron.rest.security.jwt;

import com.electron.rest.exception.ApiException;
import com.electron.rest.utility.UnitConverter;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
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

    public String generateToken(Authentication authentication) {

        String username = authentication.getName();
        Date currentDate = new Date();

        // generate date 7 day old
        long expirationDateAsLong = currentDate.getTime() + (UnitConverter.stringToLong(jwtExpirationTime));
        Date expirationDate = new Date(expirationDateAsLong);

        // return token
        return Jwts.builder()
                .subject(username)
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
            throw new ApiException("Invalid token");
        } catch (ExpiredJwtException e) {
            throw new ApiException("Expired token");
        } catch (UnsupportedJwtException e){
            throw new ApiException("Unsupported JWT token");
        } catch (IllegalArgumentException e){
            throw new ApiException("JWT claims string is empty.");
        }

        return true;
    }

}
