package com.electron.rest.email;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.util.Locale;

@Service
public class ActivationEmailService implements EmailService {

    private final JavaMailSender emailSender;
    private final SpringTemplateEngine thymeleafTemplateEngine;


    public ActivationEmailService(JavaMailSender mailSender, SpringTemplateEngine thymeleafTemplateEngine) {
        this.emailSender = mailSender;
        this.thymeleafTemplateEngine = thymeleafTemplateEngine;
    }

    @Async
    @Override
    public void sendThymeleafEmail(EmailSettings emailSettings) throws MessagingException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        String htmlBody = thymeleafTemplateEngine.process(
                "activation-link",
                new Context(Locale.ENGLISH, emailSettings.getVariables()));
        helper.setTo(emailSettings.getReceiver());
        helper.setSubject(emailSettings.getSubject());
        helper.setText(htmlBody, true);
        emailSender.send(message);
    }


}
