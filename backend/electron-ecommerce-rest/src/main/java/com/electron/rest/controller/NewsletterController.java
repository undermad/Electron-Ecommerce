package com.electron.rest.controller;

import com.electron.rest.dto.SubscriptionEmailRequest;
import com.electron.rest.dto.auth.MessageResponse;
import com.electron.rest.email.NewsletterService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.electron.rest.constants.EndpointsPaths.API_V1_NEWSLETTER;
import static com.electron.rest.constants.SuccessMessages.SUBSCRIBED;

@RestController
@RequestMapping(API_V1_NEWSLETTER)
public class NewsletterController {

    private final NewsletterService newsletterService;

    public NewsletterController(NewsletterService newsletterService) {
        this.newsletterService = newsletterService;
    }


    @PostMapping
    public ResponseEntity<MessageResponse> subscribe(@Valid @RequestBody SubscriptionEmailRequest email) {
        newsletterService.subscribe(email);
        return ResponseEntity.ok(new MessageResponse(SUBSCRIBED));
    }


}
