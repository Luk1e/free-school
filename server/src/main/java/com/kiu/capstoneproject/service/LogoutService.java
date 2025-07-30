package com.kiu.capstoneproject.service;

import com.kiu.capstoneproject.repository.TokenRepository;
import com.kiu.capstoneproject.utils.CookieUtils;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LogoutService implements LogoutHandler {
    private final TokenRepository tokenRepository;
    private final CookieUtils cookieUtils;

    @Override
    public void logout(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) {
        String jwtToken = null;

        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if (cookie.getName().equals("accessToken")) {
                    jwtToken = cookie.getValue();
                }
            }
        }

        if (jwtToken != null) {
            var storedToken = tokenRepository.findByToken(jwtToken)
                    .orElse(null);

            if (storedToken != null) {
                storedToken.setExpired(true);
                storedToken.setRevoked(true);
                tokenRepository.save(storedToken);
                SecurityContextHolder.clearContext();
            }
        }

        // Remove all tokens from cookies
        cookieUtils.addCookie(response, "accessToken", null, 0, true);
        cookieUtils.addCookie(response, "refreshToken", null, 0, true);
        cookieUtils.addCookie(response, "isUserLogged", null, 0, false);

    }
}
