package com.electron.rest.security.auth_service;

import com.electron.rest.security.auth_dto.*;
import jakarta.mail.MessagingException;
import org.springframework.http.ResponseCookie;

public interface AuthService {
    LoginResponse login(LoginDto loginDto);
    LoginResponse refreshJwt(String refreshToken);
    Boolean isRefreshTokenUpToDate(String token);
    ResponseCookie getRefreshTokenCookie(LoginDto loginDto, Boolean remember);
    ResponseCookie logout(String refreshToken);
    void logoutEverywhere(String jwt);
    void recoverPassword(PasswordRecoveryDto passwordRecoveryDto) throws MessagingException;
}
