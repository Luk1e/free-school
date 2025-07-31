package com.freeschool.server.service;

import com.freeschool.server.dto.auth.AuthUserDTO;
import com.freeschool.server.dto.auth.LoginUserDTO;
import com.freeschool.server.dto.auth.RegisterUserDTO;
import com.freeschool.server.enums.Role;
import com.freeschool.server.enums.TokenType;
import com.freeschool.server.exception.AlreadyExistsException;
import com.freeschool.server.exception.IncorrectCredentialsException;
import com.freeschool.server.exception.NotFoundException;
import com.freeschool.server.exception.TokenExpiredException;
import com.freeschool.server.i18n.I18nUtil;
import com.freeschool.server.model.entity.Student;
import com.freeschool.server.model.entity.Teacher;
import com.freeschool.server.model.entity.User;
import com.freeschool.server.repository.UserRepository;
import com.freeschool.server.model.entity.Token;
import com.freeschool.server.repository.TokenRepository;
import com.freeschool.server.utils.CookieUtils;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final TokenService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final CookieUtils cookieUtils;
    private final I18nUtil i18nUtil;

    @Value("${jwt.expiration}")
    private Long jwtExpiration;

    @Value("${jwt.refresh-expiration}")
    private long refreshExpiration;


    public AuthUserDTO authenticateUser(
            HttpServletResponse response
    ) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated()) {
            Object userObject = authentication.getPrincipal();

            if (userObject instanceof UserDetails) {
                User user = userRepository.findByEmail(((UserDetails) userObject).getUsername())
                        .orElseThrow(() -> new IncorrectCredentialsException(i18nUtil.getMessage("error.tokenNotValid")));

                return AuthUserDTO.builder()
                        .firstName(user.getFirstName())
                        .lastName(user.getLastName())
                        .email(user.getEmail())
                        .status(user.getRole())
                        .build();
            }
        }

        throw new IncorrectCredentialsException(i18nUtil.getMessage("error.tokenNotValid"));
    }


    public void registerUser(
            RegisterUserDTO registerUserDto,
            Integer status,
            HttpServletResponse response
    ) {
        Optional<User> userOptional = userRepository.
                findByEmail(registerUserDto.getEmail());

        if (userOptional.isPresent()) {
            throw new AlreadyExistsException(i18nUtil.getMessage("error.theEmailHasAlreadyBeenTaken"));
        }

        User user;
        switch (status) {
            case 0:
                user = new Teacher();
                ((Teacher) user).setRole(Role.TEACHER);
                break;
            case 1:
                user = new Student();
                ((Student) user).setRole(Role.STUDENT);
                break;
            default:
                throw new IllegalStateException(i18nUtil.getMessage("error.statusCodeIsIncorrect"));
        }

        user.setFirstName(registerUserDto.getFirstName());
        user.setLastName(registerUserDto.getLastName());
        user.setEmail(registerUserDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerUserDto.getPassword()));

        User savedUser = userRepository.save(user);

        String accessToken = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        saveUserToken(savedUser, accessToken);

        cookieUtils.addCookie(response, "accessToken", accessToken, jwtExpiration / 1000, true);
        cookieUtils.addCookie(response, "refreshToken", refreshToken, refreshExpiration / 1000, true);
        cookieUtils.addCookie(response, "isUserLogged", "true", refreshExpiration / 1000, false);

    }

    public void loginUser(
            LoginUserDTO loginUserDto,
            HttpServletResponse response
    ) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginUserDto.getEmail(),
                        loginUserDto.getPassword()
                )
        );

        User user = userRepository.
                findByEmail(loginUserDto.getEmail())
                .orElseThrow(() -> new NotFoundException(i18nUtil.getMessage("error.userNotFound")));


        if (authentication.isAuthenticated()) {
            String accessToken = jwtService.generateToken(user);
            String refreshToken = jwtService.generateRefreshToken(user);

            revokeAllUserTokens(user);

            saveUserToken(user, accessToken);

            cookieUtils.addCookie(response, "accessToken", accessToken, jwtExpiration / 1000, true);
            cookieUtils.addCookie(response, "refreshToken", refreshToken, refreshExpiration / 1000, true);
            cookieUtils.addCookie(response, "isUserLogged", "true", refreshExpiration / 1000, false);
        } else {
            throw new IncorrectCredentialsException(i18nUtil.getMessage("error.theEmailAddressOrPasswordIsIncorrect"));
        }
    }

    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        String refreshToken = null;
        String userEmail = null;

        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if (cookie.getName().equals("refreshToken")) {
                    refreshToken = cookie.getValue();
                }
            }
        }

        if (refreshToken == null || refreshToken.isEmpty()) {
            cookieUtils.addCookie(response, "accessToken", null, 0, true);
            cookieUtils.addCookie(response, "refreshToken", null, 0, true);
            cookieUtils.addCookie(response, "isUserLogged", null, 0, false);
            throw new NotFoundException(i18nUtil.getMessage("error.tokenIsEmpty"));
        }

        try {
            userEmail = jwtService.extractUsername(refreshToken);

            // If token contains username
            if (userEmail != null) {
                User user = userRepository.findByEmail(userEmail)
                        .orElseThrow(() -> new TokenExpiredException(i18nUtil.getMessage("error.invalidRefreshToken")));

                if (jwtService.isTokenValid(refreshToken, user)) {
                    String accessToken = jwtService.generateToken(user);
                    revokeAllUserTokens(user);
                    saveUserToken(user, accessToken);

                    cookieUtils.addCookie(response, "accessToken", accessToken, jwtExpiration / 1000, true);
                    return;
                }
            }

        } catch (Exception e) {
            // Skip
        }

        cookieUtils.addCookie(response, "accessToken", null, 0, true);
        cookieUtils.addCookie(response, "refreshToken", null, 0, true);
        cookieUtils.addCookie(response, "isUserLogged", null, 0, false);

        throw new NotFoundException(i18nUtil.getMessage("error.invalidRefreshToken"));
    }

    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getUserId());
        if (validUserTokens.isEmpty())
            return;

        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }
}
