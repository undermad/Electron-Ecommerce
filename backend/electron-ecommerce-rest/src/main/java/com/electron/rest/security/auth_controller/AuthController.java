package com.electron.rest.security.auth_controller;

import com.electron.rest.security.auth_dto.JwtResponse;
import com.electron.rest.security.auth_dto.LoginDto;
import com.electron.rest.security.auth_service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJkdHdvcmVrOTRAZ21haWwuY29tIiwiaWF0IjoxNzAwMDIwNzc0LCJleHAiOjE3MDA2MjU1NzR9.lRy9_xvp7Ewpv7o1Nd7pjBcLo0Y6uUSU78791nE331hcdBQFcHJenmCwzHjkme4X

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    //basic auth header is required and body is required
    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody LoginDto loginDto){
        JwtResponse jwtResponse = new JwtResponse(authService.login(loginDto));
        return ResponseEntity.ok(jwtResponse);
    }


}
