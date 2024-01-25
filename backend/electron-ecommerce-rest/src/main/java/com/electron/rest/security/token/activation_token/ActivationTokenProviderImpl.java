package com.electron.rest.security.token.activation_token;

import com.electron.rest.entity.user.ActivationToken;
import com.electron.rest.entity.user.User;
import com.electron.rest.security.token.Token;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class ActivationTokenProviderImpl extends ActivationTokenProvider{

    @Override
    public Token generateToken(User user) {
        return ActivationToken.builder()
                .user(user)
                .token(UUID.randomUUID().toString())
                .build();
    }
}
