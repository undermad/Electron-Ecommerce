package com.electron.rest.security;

import com.electron.rest.security.token.jwt.JwtAuthenticationEntryPoint;
import com.electron.rest.security.token.jwt.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

import static com.electron.rest.constants.EndpointsPaths.*;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    private JwtAuthenticationEntryPoint authenticationEntryPoint;
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Value("${hostname}")
    private String hostname;

    public SecurityConfiguration(JwtAuthenticationEntryPoint authenticationEntryPoint, JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.authenticationEntryPoint = authenticationEntryPoint;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public static PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://" + hostname));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("authorization", "content-type", "x-auth-token"));
        config.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests
                        ((authorization) -> authorization
                                .requestMatchers("/api/v1/auth/**").permitAll()
                                .requestMatchers("/api/v1/auth/logout_everywhere)").hasRole("USER")
                                .requestMatchers("/api/v1/registration/**").permitAll()
                                .requestMatchers("/api/v1/test/**").hasRole("USER") //spring will add prefix ROLE_ADMIN
                                .requestMatchers(API_V1_CATEGORY + "/**").permitAll()
                                .requestMatchers(API_V1_PRODUCT + "/**").permitAll()
                                .requestMatchers(API_V1_BASKET + "/**").hasAnyRole("USER", "ADMIN")
                                .requestMatchers(API_V1_ADDRESS + "/**").hasAnyRole("USER", "ADMIN")
                                .anyRequest()
                                .authenticated())

                //exception handling filter
                .exceptionHandling((e) ->
                        e.authenticationEntryPoint(authenticationEntryPoint))

                //session
                .sessionManagement((session) ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .httpBasic(Customizer.withDefaults());


        // filters
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }


}
