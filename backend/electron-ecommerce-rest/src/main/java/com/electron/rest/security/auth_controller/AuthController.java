package com.electron.rest.security.auth_controller;

import com.electron.rest.security.auth_dto.*;
import com.electron.rest.security.auth_service.AuthService;
import com.electron.rest.security.auth_service.RefreshTokenService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.electron.rest.constants.EndpointsPaths.*;
import static com.electron.rest.constants.SuccessMessages.LOGOUT_SUCCESS;


@RestController
@RequestMapping(API_V1_AUTH)
public class AuthController {

    private final AuthService authService;
    private final RefreshTokenService refreshTokenService;

    @Autowired
    public AuthController(AuthService authService, RefreshTokenService refreshTokenService) {
        this.authService = authService;
        this.refreshTokenService = refreshTokenService;
    }

    //basic auth header is required and body is required
    @PostMapping(LOGIN)
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginDto loginDto) {
        LoginResponse loginResponse = authService.login(loginDto);
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE,
                        refreshTokenService.createCookie(loginDto).toString())
                .body(loginResponse);
    }

    @PostMapping(REGISTER)
    public ResponseEntity<RegisterResponse> register(@Valid @RequestBody RegisterDto registerDto) {
        return new ResponseEntity<>(authService.register(registerDto), HttpStatus.CREATED);
    }

    @GetMapping(REFRESH_TOKEN)
    public ResponseEntity<LoginResponse> refreshToken(HttpServletRequest request) {
        String refreshToken = refreshTokenService.isTokenUpToDate(request);
        return ResponseEntity.ok(authService.refreshToken(refreshToken));
    }

    @GetMapping(REFRESH_TOKEN + LOGOUT)
    public ResponseEntity<LogoutResponse> logout(HttpServletRequest request) {
        ResponseCookie clearCookie = refreshTokenService.createClearCookie(request);
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE,
                        clearCookie.toString())
                .body(new LogoutResponse(LOGOUT_SUCCESS));
    }


}
