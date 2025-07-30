package com.kiu.capstoneproject.controller;

import com.kiu.capstoneproject.dto.auth.AuthUserDTO;
import com.kiu.capstoneproject.dto.auth.LoginUserDTO;
import com.kiu.capstoneproject.dto.auth.RegisterUserDTO;
import com.kiu.capstoneproject.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "api/v1/auth")
public class AuthController {
    private final AuthService authService;


    @GetMapping(path = "/authenticate")
    @ResponseStatus(HttpStatus.OK)
    public AuthUserDTO authenticateUser(
            HttpServletResponse response
    ) {
        return authService.authenticateUser(response);
    }

    @PostMapping(path = "/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void registerUser(
            @Valid @RequestBody RegisterUserDTO registerUserDto,
            @RequestParam(required = true) Integer status,
            HttpServletResponse response
    ) {
        authService.registerUser(registerUserDto, status, response);
    }

    @PostMapping(path = "/login")
    @ResponseStatus(HttpStatus.OK)
    public void loginUser(
            @Valid @RequestBody LoginUserDTO loginUserDto,
            HttpServletResponse response
    ) {
        authService.loginUser(loginUserDto, response);
    }

    @PostMapping("/refresh")
    @ResponseStatus(HttpStatus.OK)
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        authService.refreshToken(request, response);
    }
}
