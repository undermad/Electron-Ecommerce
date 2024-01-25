package com.electron.rest.service;

import com.electron.rest.dto.ChangeForgottenPasswordDto;
import com.electron.rest.dto.LoginDto;
import com.electron.rest.dto.LoginResponse;
import com.electron.rest.dto.PasswordRecoveryDto;
import com.electron.rest.exception.TokenException;
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
    void changeForgottenPassword(String passwordRecoveryToken, ChangeForgottenPasswordDto changeForgottenPasswordDto) throws TokenException;
}
