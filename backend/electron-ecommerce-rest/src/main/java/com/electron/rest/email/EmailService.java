package com.electron.rest.email;

import jakarta.mail.MessagingException;
import jakarta.validation.constraints.Email;

import java.util.Map;

public interface EmailService {
    void sendThymeleafEmail(EmailSettings emailSettings) throws MessagingException;
}