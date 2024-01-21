package com.electron.rest.security.auth_service;

import com.electron.rest.exception.ActivationTokenException;
import com.electron.rest.security.auth_dto.MessageResponse;
import com.electron.rest.security.auth_dto.RegisterDto;
import com.electron.rest.security.auth_dto.RegisterResponse;
import jakarta.mail.MessagingException;

public interface RegistrationService {
    RegisterResponse register(RegisterDto registerDto) throws MessagingException;
    MessageResponse activate(String activationToken) throws ActivationTokenException;
}
