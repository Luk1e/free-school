package com.freeschool.server.dto.auth;


import com.freeschool.server.enums.Role;
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
