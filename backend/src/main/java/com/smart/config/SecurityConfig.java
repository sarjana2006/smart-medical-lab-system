package com.smart.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> {})

            .authorizeHttpRequests(auth -> auth

                // Allow CORS preflight requests
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // Health API
                .requestMatchers("/health").permitAll()

                // Login & Registration
                .requestMatchers("/patient/login").permitAll()
                .requestMatchers("/patient/register").permitAll()

                // Patient features
                .requestMatchers("/tests/**").permitAll()
                .requestMatchers("/booking/**").permitAll()
                .requestMatchers("/report/patient/**").permitAll()
                .requestMatchers("/test-result/**").permitAll()
                .requestMatchers("/followups/**").permitAll()

                // Admin - Patients
                .requestMatchers("/patient").hasRole("ADMIN")
                .requestMatchers("/patient/*").hasRole("ADMIN")

                // Admin - Reports
                .requestMatchers(HttpMethod.DELETE, "/report/**").hasRole("ADMIN")
                .requestMatchers("/report/**").hasRole("ADMIN")

                // Admin - Bookings
                .requestMatchers("/booking").hasRole("ADMIN")
                .requestMatchers("/booking/*").hasRole("ADMIN")

                // Admin - Tests
                .requestMatchers("/tests").hasRole("ADMIN")
                .requestMatchers("/tests/*").hasRole("ADMIN")

                // All other requests
                .anyRequest().authenticated()
            )

            // JWT Authentication Filter
            .addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }
}