package com.electron.rest.security.token.activation_token;

import com.electron.rest.security.auth_entity.ActivationToken;
import com.electron.rest.security.auth_entity.User;
import com.electron.rest.security.token.Token;
import com.electron.rest.security.token.TokenFactory;
import org.springframework.stereotype.Component;

import java.util.UUID;

public abstract class ActivationTokenProvider implements TokenFactory<User> {
}
