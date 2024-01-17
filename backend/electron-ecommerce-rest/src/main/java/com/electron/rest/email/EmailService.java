package com.electron.rest.email;

import jakarta.mail.MessagingException;

import java.util.Map;

public interface EmailService {
    void sendEmail(String to, String subject, String body);
    void sendThymeleafEmail(String to, String subject, String htmlBody) throws MessagingException;
    void createThymeleafTemplate(Map<String, Object> variables, String to, String subject) throws MessagingException;
}