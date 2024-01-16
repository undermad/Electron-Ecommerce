package com.electron.rest.cookie;

import org.springframework.http.ResponseCookie;

public interface CookieFactory {
    ResponseCookie createCookie(String value);
    ResponseCookie createClearCookie();
}
