package com.electron.rest.service.auth;

import com.electron.rest.exception.TokenException;
import com.electron.rest.dto.auth.MessageResponse;
import com.electron.rest.dto.auth.RegisterDto;
import com.electron.rest.dto.auth.RegisterResponse;
import jakarta.mail.MessagingException;

public interface RegistrationService {
    RegisterResponse register(RegisterDto registerDto) throws MessagingException;
    MessageResponse activate(String activationToken) throws TokenException;
}
