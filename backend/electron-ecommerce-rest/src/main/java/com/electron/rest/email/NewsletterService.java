package com.electron.rest.email;

import com.electron.rest.dto.SubscriptionEmailRequest;
import com.electron.rest.entity.projections.SubscriptionEmailProjection;
import com.electron.rest.entity.user.SubscriptionEmail;
import com.electron.rest.mapper.SubscribedEmailMapper;
import com.electron.rest.repository.newsletter.NewsletterRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class NewsletterService {

    private final NewsletterRepository newsletterRepository;
    private final SubscribedEmailMapper subscribedEmailMapper;

    public NewsletterService(NewsletterRepository newsletterRepository, SubscribedEmailMapper subscribedEmailMapper) {
        this.newsletterRepository = newsletterRepository;
        this.subscribedEmailMapper = subscribedEmailMapper;
    }


    public void subscribe(SubscriptionEmailRequest email) {
        SubscriptionEmail subscriptionEmail = subscribedEmailMapper.mapToSubscribedEmail(email);
        Optional<SubscriptionEmailProjection> subscriptionEmailProjectionOptional = newsletterRepository.getEmail(email.email());
        if (subscriptionEmailProjectionOptional.isPresent()) return;
        newsletterRepository.save(subscriptionEmail);
    }

}
