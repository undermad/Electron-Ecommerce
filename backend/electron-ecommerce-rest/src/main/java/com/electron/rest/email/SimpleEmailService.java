package com.electron.rest.email;

import com.electron.rest.security.auth_entity.ActivationToken;
import com.electron.rest.security.token.activation_token.ActivationTokenProvider;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class SimpleEmailService implements EmailService {

    private final JavaMailSender emailSender;
    private final ActivationTokenProvider activationTokenProvider;

    @Value("${spring.mail.username}")
    private String ecommerceEmail;

    public SimpleEmailService(JavaMailSender mailSender, ActivationTokenProvider activationTokenProvider) {
        this.emailSender = mailSender;
        this.activationTokenProvider = activationTokenProvider;
    }

    @Async
    @Override
    public void sendEmail(String to, String subject, String body) {
        ActivationToken activationToken = (ActivationToken) activationTokenProvider.generateToken(1L);

        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom(ecommerceEmail);
        simpleMailMessage.setSubject(subject);
        simpleMailMessage.setTo(to);
        simpleMailMessage.setText(body + " " + activationToken.getToken());
        emailSender.send(simpleMailMessage);
    }

    @Async
    @Override
    public void sendThymeleafEmail(String to, String subject, String htmlBody) throws MessagingException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper  helper = new MimeMessageHelper(message, true, "UTF-8");
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(htmlBody, true);
        emailSender.send(message);
    }



}
