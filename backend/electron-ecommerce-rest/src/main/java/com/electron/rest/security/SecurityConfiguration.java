package com.electron.rest.security;

import com.electron.rest.security.token.jwt.JwtAuthenticationEntryPoint;
import com.electron.rest.security.token.jwt.JwtAuthenticationFilter;
import com.electron.rest.security.xss.XssSanitiserFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.header.writers.XXssProtectionHeaderWriter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Collections;
import java.util.List;

import static com.electron.rest.constants.EndpointsPaths.*;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration
{

    private JwtAuthenticationEntryPoint authenticationEntryPoint;
    private JwtAuthenticationFilter jwtAuthenticationFilter;
    private XssSanitiserFilter xssSanitiserFilter;


    public SecurityConfiguration(JwtAuthenticationEntryPoint authenticationEntryPoint, JwtAuthenticationFilter jwtAuthenticationFilter, XssSanitiserFilter xssSanitiserFilter)
    {
        this.authenticationEntryPoint = authenticationEntryPoint;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.xssSanitiserFilter = xssSanitiserFilter;
    }

    @Bean
    public static PasswordEncoder passwordEncoder()
    {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception
    {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public FilterRegistrationBean<XssSanitiserFilter> xssSanitiserFilterFilterRegistrationBean()
    {
        FilterRegistrationBean<XssSanitiserFilter> xssFilterBean = new FilterRegistrationBean<>();
        xssFilterBean.setFilter(new XssSanitiserFilter());
        xssFilterBean.addUrlPatterns("/*");
        return xssFilterBean;
    }


    @Bean
    public CorsConfigurationSource corsConfigurationSource()
    {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("https://myelectron.co.uk", "https://www.myelectron.co.uk", ""));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("authorization", "content-type", "x-auth-token"));
        config.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception
    {

        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(AbstractHttpConfigurer::disable)
                .headers(HeadersConfigurer -> HeadersConfigurer
                        .xssProtection(xss -> xss.headerValue(XXssProtectionHeaderWriter.HeaderValue.ENABLED_MODE_BLOCK))
                        .contentSecurityPolicy(csp -> csp.policyDirectives("script-src 'self'"))) // just in case if we use swagger or any other server rendered websites.
                .authorizeHttpRequests
                        ((authorization) -> authorization
                                .requestMatchers("/api/v1/auth/**").permitAll()
                                .requestMatchers("/api/v1/registration/**").permitAll()
                                .requestMatchers(API_V1_CATEGORY + "/**").permitAll()
                                .requestMatchers(API_V1_PRODUCT + "/**").permitAll()
                                .requestMatchers(API_V1_NEWSLETTER + "/**").permitAll()
                                .requestMatchers(API_V1_ACCOUNT + "/**").hasAnyRole("USER")
                                .requestMatchers("/api/v1/test/**").hasRole("USER") //spring will add prefix ROLE_ADMIN
                                .requestMatchers("/api/v1/auth/logout_everywhere)").hasRole("USER")
                                .requestMatchers(API_V1_ORDER + "/**").hasAnyRole("USER")
                                .requestMatchers(API_V1_BASKET + "/**").hasAnyRole("USER", "ADMIN")
                                .requestMatchers(API_V1_ADDRESS + "/**").hasAnyRole("USER", "ADMIN")
                                .requestMatchers("/api/prometheus/**").permitAll()
                                .anyRequest().authenticated())

                //exception handling filter
                .exceptionHandling((e) ->
                        e.authenticationEntryPoint(authenticationEntryPoint))

                //session
                .sessionManagement((session) ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .httpBasic(Customizer.withDefaults());


        // filters
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        http.addFilter(xssSanitiserFilter);

        return http.build();
    }


}
