package com.freeschool.server.integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.freeschool.server.dto.auth.LoginUserDTO;
import com.freeschool.server.dto.auth.RegisterUserDTO;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class AuthFlowTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    static String email;
    static String password;

    @Test
    @Order(1)
    void registerUser() throws Exception {
        email = "john.doe" + System.currentTimeMillis() + "@example.com";
        password = "Password123";

        RegisterUserDTO registerDto = new RegisterUserDTO();
        registerDto.setFirstName("John");
        registerDto.setLastName("Doe");
        registerDto.setEmail(email);
        registerDto.setPassword(password);
        registerDto.setConfirmPassword(password);

        mockMvc.perform(post("/api/v1/auth/register").param("status", "1")
                .contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(registerDto))).andExpect(status().isCreated());
    }

    @Test
    @Order(2)
    void logoutUser() throws Exception {
        mockMvc.perform(get("/api/v1/auth/logout")).andExpect(status().isOk());
    }

    @Test
    @Order(3)
    void loginUser() throws Exception {
        Thread.sleep(1000);
        LoginUserDTO loginDto = new LoginUserDTO();
        loginDto.setEmail(email);
        loginDto.setPassword(password);

        mockMvc.perform(post("/api/v1/auth/login").contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(loginDto))).andExpect(status().isOk());
    }
}