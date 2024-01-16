package com.electron.rest.security.token.activation_token;

import com.electron.rest.security.auth_entity.ActivationToken;
import com.electron.rest.security.auth_entity.User;
import com.electron.rest.token.Token;
import com.electron.rest.token.TokenFactory;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class ActivationTokenProvider implements TokenFactory<Long> {

    @Override
    public Token generateToken(Long userId) {
        User user = new User();
        user.setId(userId);
        return ActivationToken.builder()
                .user(user)
                .activationToken(UUID.randomUUID().toString())
                .build();
    }

}
