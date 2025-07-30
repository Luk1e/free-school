package com.kiu.capstoneproject.dto.auth;


import com.kiu.capstoneproject.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthUserDTO {
    private String firstName;
    private String lastName;
    private String email;
    private Role status;
}
