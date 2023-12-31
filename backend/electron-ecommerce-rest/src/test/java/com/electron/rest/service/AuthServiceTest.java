package com.electron.rest.service;

import com.electron.rest.security.auth_repository.UserRepository;
import com.electron.rest.security.auth_service.AuthServiceImpl;
import com.electron.rest.security.jwt.JwtProvider;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class AuthServiceTest {

    @Mock
    JwtProvider jwtProvider;

    @Mock
    UserRepository userRepository;

    @InjectMocks
    AuthServiceImpl authService;

    @Test
    public void AuthService_login_JwtResponse() {


    }


}
