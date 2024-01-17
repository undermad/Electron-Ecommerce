package com.electron.rest.email;

import jakarta.mail.MessagingException;

public interface EmailService {
    void sendEmail(String to, String subject, String body);
    void sendThymeleafEmail(String to, String subject, String htmlBody) throws MessagingException;
}