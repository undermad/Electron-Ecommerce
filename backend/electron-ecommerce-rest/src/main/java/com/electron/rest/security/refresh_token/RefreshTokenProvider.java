package com.electron.rest.security.refresh_token;

import com.electron.rest.cookie.CookieFactory;
import com.electron.rest.token.TokenFactory;

public abstract class RefreshTokenProvider implements TokenFactory<Long>, CookieFactory {
}
