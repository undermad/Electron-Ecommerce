package com.electron.rest.security.auth_controller;

import com.electron.rest.security.auth_dto.JwtResponse;
import com.electron.rest.security.auth_dto.LoginDto;
import com.electron.rest.security.auth_dto.RegisterDto;
import com.electron.rest.security.auth_dto.RegisterResponse;
import com.electron.rest.security.auth_service.AuthService;
import com.electron.rest.security.auth_service.RefreshTokenService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.electron.rest.constants.EndpointsPaths.*;


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
    public ResponseEntity<JwtResponse> login(@Valid @RequestBody LoginDto loginDto) {
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE,
                        refreshTokenService.getRefreshTokenCookie(loginDto).toString())
                .body(authService.login(loginDto));
    }

    @PostMapping(REFRESH_TOKEN)
    public ResponseEntity<JwtResponse> refreshToken(HttpServletRequest request) {
        String refreshToken = refreshTokenService.isTokenUpToDate(request);
        return ResponseEntity.ok(authService.refreshJwt(refreshToken));
    }

    @PostMapping(REGISTER)
    public ResponseEntity<RegisterResponse> register(@Valid @RequestBody RegisterDto registerDto) {
        return new ResponseEntity<>(authService.register(registerDto), HttpStatus.CREATED);
    }


}
