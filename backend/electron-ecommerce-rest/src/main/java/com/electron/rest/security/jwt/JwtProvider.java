package com.electron.rest.security.jwt;

import com.electron.rest.exception.ApiException;
import com.electron.rest.utility.UnitConverter;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.web.util.WebUtils;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.util.Date;

@Component
public class JwtProvider {

    @Value("${app.jwt-secret}")
    private String jwtSecret;

    @Value("${app-jwt-expiration-millisecond}")
    private String jwtExpirationTime;

    @Value("${app-refresh-token-expiration-millisecond}")
    private String refreshTokenExpirationTime;

    @Value("${app-refresh-token-name}")
    private String refreshTokenName;


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
            throw new ApiException("Invalid token");
        } catch (ExpiredJwtException e) {
            throw new ApiException("Expired token");
        } catch (UnsupportedJwtException e) {
            throw new ApiException("Unsupported JWT token");
        } catch (IllegalArgumentException e) {
            throw new ApiException("JWT claims string is empty.");
        }

        return true;
    }

    public ResponseCookie generateRefreshTokenCookie(String refreshToken) {
        return ResponseCookie
                .from(refreshTokenName, refreshToken)
                .maxAge(UnitConverter.millisecondsToSeconds(Long.parseLong(refreshTokenExpirationTime)))
                .path("/api/v1/auth/refreshtoken")
                .httpOnly(true)
                .build();
    }

    public String getRefreshTokenFromCookie(HttpServletRequest request) {
        Cookie cookie = WebUtils.getCookie(request, refreshTokenName);
        return cookie != null ? cookie.getValue() : null;
    }
}
