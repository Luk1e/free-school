package com.freeschool.server.utils;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

@Component
public class CookieUtils {
    @Value("${app.cookie.secure}")
    private boolean secure;

    public void addCookie(
            HttpServletResponse response,
            String cookieName,
            String value,
            long expiration,
            boolean httpOnly
    ) {
        if (value == null) {
            value = "";
        }
        ResponseCookie cookie = ResponseCookie.from(cookieName, value)
                .httpOnly(httpOnly)
                .secure(secure)
                .path("/")
                .maxAge(expiration)
                .sameSite("Strict")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }
}