package com.kiu.capstoneproject.configuration;

import com.kiu.capstoneproject.enums.Role;
import com.kiu.capstoneproject.exception.CustomAccessDeniedHandler;
import com.kiu.capstoneproject.exception.CustomAuthenticationEntryPoint;
import com.kiu.capstoneproject.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;


import javax.sound.midi.Patch;
import java.nio.file.Path;

import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.PATCH;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {
    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
    private final LogoutHandler logoutHandler;
    private static final String[] WHITE_LIST_URL = {"/api/v1/auth/login", "/api/v1/auth/register", "/api/v1/auth/refresh"};

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                // Disable CSRF(Cross-Site Request Forgery) because of JWT Auth
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(req ->
                        req.requestMatchers(WHITE_LIST_URL)
                                .permitAll()
                                .requestMatchers("/api/v1/classroom/enroll").hasAnyAuthority(Role.STUDENT.name())
                                .requestMatchers("/api/v1/user/**").hasAnyAuthority(Role.STUDENT.name(), Role.TEACHER.name())
                                .requestMatchers
                                        (
                                                GET,
                                                "/api/v1/classroom",
                                                "api/v1/classroom/{classroomId}/homeworks",
                                                "api/v1/classroom/{classroomId}/homeworks/{homeworkId}/{studentId}"
                                        )
                                .hasAnyAuthority(Role.TEACHER.name(), Role.STUDENT.name())
                                .requestMatchers
                                        (
                                                PATCH,
                                                "api/v1/classroom/{classroomId}/homeworks/{homeworkId}/submit",
                                                "api/v1/classroom/{classroomId}/homeworks/{homeworkId}/remove"
                                        )
                                .hasAnyAuthority(Role.TEACHER.name(), Role.STUDENT.name())
                                .requestMatchers("/api/v1/classroom/**").hasAnyAuthority(Role.TEACHER.name())

                                .anyRequest()
                                .authenticated()
                )
                .exceptionHandling((exception) -> exception.accessDeniedHandler(new CustomAccessDeniedHandler())
                        .authenticationEntryPoint(new CustomAuthenticationEntryPoint()))
                .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .logout(logout ->
                        logout.logoutUrl("/api/v1/auth/logout")
                                .addLogoutHandler(logoutHandler)
                                .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext())
                );

        return httpSecurity.build();
    }
}





