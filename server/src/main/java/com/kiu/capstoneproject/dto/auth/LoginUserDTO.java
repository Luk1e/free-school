package com.kiu.capstoneproject.dto.auth;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginUserDTO {
    @NotBlank(message = "Email is mandatory.")
    @Email(message = "Email must be a valid email address.")
    private String email;

    @NotBlank(message = "Password is mandatory.")
    private String password;
}
