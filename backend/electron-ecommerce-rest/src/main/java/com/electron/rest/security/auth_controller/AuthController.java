package com.electron.rest.security.auth_controller;

import com.electron.rest.exception.RefreshTokenException;
import com.electron.rest.security.auth_dto.*;
import com.electron.rest.security.auth_service.AuthService;
import com.electron.rest.security.auth_service.RefreshTokenService;
import com.electron.rest.security.refresh_token.RefreshTokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.electron.rest.constants.EndpointsPaths.*;
import static com.electron.rest.constants.ErrorMessages.INVALID_TOKEN;
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
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody
                                               LoginDto loginDto,
                                               @RequestParam(name = "remember", defaultValue = "false", required = false)
                                               Boolean remember) {
        LoginResponse loginResponse = authService.login(loginDto);
        ResponseCookie refreshTokenCookie = refreshTokenService.getRefreshTokenCookie(loginDto, remember);

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString())
                .body(loginResponse);
    }

    @GetMapping(REFRESH_TOKEN)
    public ResponseEntity<LoginResponse> refreshToken(@CookieValue(value = "${app-refresh-token-name}")
                                                      String refreshToken) {
        if (!refreshTokenService.isTokenUpToDate(refreshToken)) throw new RefreshTokenException(INVALID_TOKEN);
        LoginResponse loginResponse = authService.refreshJwt(refreshToken);

        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping(REGISTER)
    public ResponseEntity<RegisterResponse> register(@Valid @RequestBody RegisterDto registerDto) {
        return new ResponseEntity<>(authService.register(registerDto), HttpStatus.CREATED);
    }

    @PostMapping(REFRESH_TOKEN + LOGOUT)
    public ResponseEntity<LogoutResponse> logout(@CookieValue(value = "${app-refresh-token-name}")
                                                 String refreshToken) {
        ResponseCookie clearCookie = refreshTokenService.getLogoutCookie(refreshToken);
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE,
                        clearCookie.toString())
                .body(new LogoutResponse(LOGOUT_SUCCESS));
    }

    @PostMapping(LOGOUT_EVERYWHERE)
    public ResponseEntity<LogoutResponse> logoutFromAllDevices(@RequestHeader("Authorization")
                                                               String jwt) {
        refreshTokenService.logoutEverywhere(jwt);
        return ResponseEntity.ok(new LogoutResponse(LOGOUT_SUCCESS));
    }


}
