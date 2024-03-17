package com.electron.rest.email;

import org.springframework.stereotype.Component;

@Component(NewsletterSubscriptionEmailSettings.BEAN_ID)
public class NewsletterSubscriptionEmailSettings implements EmailSettingsFactory<String>{
    public static final String BEAN_ID = "newsletterSubscriptionEmailSettings";

    @Override
    public EmailSettings createSettings(String value) {
        return EmailSettings.builder()
                .receiver(value)
                .subject("Electron - Newsletter subscription confirmation.")
                .template("newsletter-subscription-confirmation")
                .build();
    }
}
