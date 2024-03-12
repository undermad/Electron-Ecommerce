package com.electron.rest.email;

import com.electron.rest.entity.user.PasswordRecoveryToken;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component("passwordRecoveryEmailSettings")
public class PasswordRecoveryEmailSettingsProvider implements EmailSettingsFactory<PasswordRecoveryToken> {

    @Value("${app-recovery-token-expiration-millisecond}")
    private String expirationTime;

    @Value("${hostname}")
    private String hostname;

    @Override
    public EmailSettings createSettings(PasswordRecoveryToken passwordRecoveryToken) {
        return EmailSettings.builder()
                .receiver(passwordRecoveryToken.getUser().getEmail())
                .subject("Electron - Password Recovery")
                .template("password-recovery-link")
                .variables(Map.of(
                        "duration", convertExpirationTimeToMinutes(this.expirationTime),
                        "passwordRecoveryLink", "http://" + hostname + "/changeforgottenpassword/" + passwordRecoveryToken.getToken()
                ))
                .build();
    }

    private String convertExpirationTimeToMinutes(String expirationTime){
        return String.valueOf((Long.parseLong(expirationTime) / 1000) / 60);
    }
}
