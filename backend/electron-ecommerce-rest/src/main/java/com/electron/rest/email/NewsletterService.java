package com.electron.rest.email;

import com.electron.rest.dto.SubscriptionEmailRequest;
import com.electron.rest.entity.projections.SubscriptionEmailProjection;
import com.electron.rest.entity.user.SubscriptionEmail;
import com.electron.rest.mapper.SubscribedEmailMapper;
import com.electron.rest.repository.newsletter.NewsletterRepository;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class NewsletterService {

    private final NewsletterRepository newsletterRepository;
    private final SubscribedEmailMapper subscribedEmailMapper;
    private final EmailService emailService;

    @Qualifier(NewsletterSubscriptionEmailSettings.BEAN_ID)
    private final EmailSettingsFactory<String> emailSettingsFactory;

    public NewsletterService(NewsletterRepository newsletterRepository, SubscribedEmailMapper subscribedEmailMapper, EmailService emailService, EmailSettingsFactory<String> emailSettingsFactory) {
        this.newsletterRepository = newsletterRepository;
        this.subscribedEmailMapper = subscribedEmailMapper;
        this.emailService = emailService;
        this.emailSettingsFactory = emailSettingsFactory;
    }


    public void subscribe(SubscriptionEmailRequest email) throws MessagingException {
        SubscriptionEmail subscriptionEmail = subscribedEmailMapper.mapToSubscribedEmail(email);
        Optional<SubscriptionEmailProjection> subscriptionEmailProjectionOptional = newsletterRepository.getEmail(email.email());
        if (subscriptionEmailProjectionOptional.isPresent()) return;
        newsletterRepository.save(subscriptionEmail);
        EmailSettings emailSettings = emailSettingsFactory.createSettings(email.email());
        emailService.sendThymeleafEmail(emailSettings);
    }

}
