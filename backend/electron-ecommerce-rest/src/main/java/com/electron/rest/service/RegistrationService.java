package com.electron.rest.service;

import com.electron.rest.exception.TokenException;
import com.electron.rest.dto.MessageResponse;
import com.electron.rest.dto.RegisterDto;
import com.electron.rest.dto.RegisterResponse;
import jakarta.mail.MessagingException;

public interface RegistrationService {
    RegisterResponse register(RegisterDto registerDto) throws MessagingException;
    MessageResponse activate(String activationToken) throws TokenException;
}
