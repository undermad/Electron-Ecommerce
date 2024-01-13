package com.electron.rest.security;

import org.springframework.util.StringUtils;

public class AuthUtils {

    public static String substringBearer(String tokenWithBearerPrefix) {
        if (StringUtils.hasText(tokenWithBearerPrefix) && tokenWithBearerPrefix.startsWith("Bearer ")) {
            return tokenWithBearerPrefix.substring(7);
        }
        return null;
    }
}
