package com.electron.rest.mapper;

import com.electron.rest.dto.SubscriptionEmailRequest;
import com.electron.rest.entity.user.SubscriptionEmail;
import org.springframework.stereotype.Component;

@Component
public class SubscribedEmailMapper {

    public SubscriptionEmail mapToSubscribedEmail(SubscriptionEmailRequest subscriptionRequest) {
        SubscriptionEmail subscriptionEmail = new  SubscriptionEmail();
        subscriptionEmail.setEmail(subscriptionRequest.email());
        return subscriptionEmail;
    }
}
