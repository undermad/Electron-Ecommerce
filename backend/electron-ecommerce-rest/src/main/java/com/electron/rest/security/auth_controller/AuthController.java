package com.electron.rest.security.auth_controller;

import com.electron.rest.exception.RefreshTokenException;
import com.electron.rest.security.auth_dto.JwtResponse;
import com.electron.rest.security.auth_dto.LoginDto;
import com.electron.rest.security.auth_repository.RefreshTokenRepository;
import com.electron.rest.security.auth_repository.projections.RefreshTokenProjection;
import com.electron.rest.security.auth_service.AuthService;
import com.electron.rest.security.auth_service.RefreshTokenService;
import com.electron.rest.security.jwt.JwtProvider;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private AuthService authService;
    private JwtProvider jwtProvider;
    private RefreshTokenRepository refreshTokenRepository;
    private RefreshTokenService refreshTokenService;

    public AuthController(AuthService authService, JwtProvider jwtProvider, RefreshTokenRepository refreshTokenRepository, RefreshTokenService refreshTokenService) {
        this.authService = authService;
        this.jwtProvider = jwtProvider;
        this.refreshTokenRepository = refreshTokenRepository;
        this.refreshTokenService = refreshTokenService;
    }

    //basic auth header is required and body is required
    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody LoginDto loginDto) {
        JwtResponse jwtResponse = new JwtResponse(authService.login(loginDto));

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, authService.generateRefreshTokenCookieFromLoginDto(loginDto).toString())
                .body(jwtResponse);

    }

    @PostMapping("refreshtoken")
    public ResponseEntity<JwtResponse> refreshToken(HttpServletRequest request) {
        String refreshToken = jwtProvider.getJwtRefreshTokenFromCookies(request);
        if (refreshToken != null) {

            RefreshTokenProjection refreshTokenProjection = refreshTokenRepository.findRefreshTokenByToken(refreshToken).get(0);
            refreshTokenService.isTokenUpToDate(refreshTokenProjection.getExpirationDate(), refreshTokenProjection.getId());
            JwtResponse jwtResponse = new JwtResponse(authService.generateJwtFromRefreshToken(refreshTokenProjection.getToken()));

            return ResponseEntity.ok(jwtResponse);

        }
        throw new RefreshTokenException("Token expired");
    }


}
