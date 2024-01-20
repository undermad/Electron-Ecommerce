package com.electron.rest.email;

import com.electron.rest.security.auth_entity.ActivationToken;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component("activationEmailSettings")
public class ActivationEmailSettings implements EmailSettingsFactory<ActivationToken> {

    @Value("${hostname}")
    private String hostname;

    @Override
    public EmailSettings createSettings(ActivationToken activationToken) {

        return EmailSettings.builder()
                .receiver(activationToken.getUser().getEmail())
                .subject("Electron - Your account activation link.")
                .variables(Map.of(
                        "activationLink", "http://" + hostname + "/activate/" + activationToken.getToken(),
                        "firstName", activationToken.getUser().getFirstName()))
                .build();
    }
}
