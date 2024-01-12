package com.electron.rest.security;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.util.StringUtils;

public class AuthUtils {

    public static String getTokenFromRequest(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        if (StringUtils.hasText(token) && token.startsWith("Bearer ")) {
            return token.substring(7);
        }

        return null;
    }
}
