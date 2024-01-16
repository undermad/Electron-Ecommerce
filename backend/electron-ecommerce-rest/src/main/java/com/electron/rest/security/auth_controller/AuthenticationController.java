package com.electron.rest.security.auth_controller;

import com.electron.rest.exception.RefreshTokenException;
import com.electron.rest.security.auth_dto.*;
import com.electron.rest.security.auth_service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
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
public class AuthenticationController {

    private final AuthService authService;

    @Autowired
    public AuthenticationController(AuthService authService) {
        this.authService = authService;
    }

    //basic auth header is required and body is required
    @PostMapping(LOGIN)
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody
                                               LoginDto loginDto,
                                               @RequestParam(name = "remember", defaultValue = "false", required = false)
                                               Boolean remember) {
        LoginResponse loginResponse = authService.login(loginDto);
        ResponseCookie refreshTokenCookie = authService.getRefreshTokenCookie(loginDto, remember);

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString())
                .body(loginResponse);
    }

    @GetMapping(REFRESH_TOKEN)
    public ResponseEntity<LoginResponse> refreshToken(@CookieValue(value = "${app-refresh-token-name}")
                                                      String refreshToken) {
        if (!authService.isRefreshTokenUpToDate(refreshToken)) throw new RefreshTokenException(INVALID_TOKEN);
        LoginResponse loginResponse = authService.refreshJwt(refreshToken);

        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping(REFRESH_TOKEN + LOGOUT)
    public ResponseEntity<LogoutResponse> logout(@CookieValue(value = "${app-refresh-token-name}")
                                                 String refreshToken) {
        ResponseCookie clearCookie = authService.getLogoutCookie(refreshToken);
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE,
                        clearCookie.toString())
                .body(new LogoutResponse(LOGOUT_SUCCESS));
    }

    @PostMapping(LOGOUT_EVERYWHERE)
    public ResponseEntity<LogoutResponse> logoutFromAllDevices(@RequestHeader("Authorization")
                                                               String jwt) {
        authService.logoutEverywhere(jwt);
        return ResponseEntity.ok(new LogoutResponse(LOGOUT_SUCCESS));
    }




}
