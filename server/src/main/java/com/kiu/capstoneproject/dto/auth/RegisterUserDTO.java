package com.kiu.capstoneproject.dto.auth;

import com.kiu.capstoneproject.dto.validation.PasswordMatching;
import com.kiu.capstoneproject.dto.validation.StrongPassword;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@PasswordMatching(
        password = "password",
        confirmPassword = "confirmPassword",
        message = "Password and Confirm Password must be matched!"
)
public class RegisterUserDTO {
    @NotBlank(message = "First name is mandatory.")
    @Size(min = 2, message = "First name must be at least 2 characters.")
    @Size(max = 30, message = "First name must not exceed 30 characters.")
    private String firstName;

    @NotBlank(message = "Last name is mandatory.")
    @Size(min = 2, message = "Last name must be at least 2 characters.")
    @Size(max = 30, message = "Last name must not exceed 30 characters.")
    private String lastName;

    @NotBlank(message = "Email is mandatory.")
    @Size(max = 50, message = "Email must not exceed 50 characters.")
    @Email(message = "Email must be a valid email address.")
    private String email;

    @NotBlank(message = "Password is mandatory.")
    @StrongPassword
    private String password;

    @NotBlank(message = "Confirm password is mandatory.")
    private String confirmPassword;
}
