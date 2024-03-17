package com.electron.rest.controller;

import com.electron.rest.exception.TokenException;
import com.electron.rest.dto.auth.MessageResponse;
import com.electron.rest.dto.auth.RegisterDto;
import com.electron.rest.dto.auth.RegisterResponse;
import com.electron.rest.service.auth.RegistrationService;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.electron.rest.constants.EndpointsPaths.*;

@RestController
@RequestMapping(API_V1_REGISTRATION)
public class RegistrationController {

    private final RegistrationService registrationService;

    public RegistrationController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    @PostMapping(REGISTER)
    public ResponseEntity<RegisterResponse> register(@Valid @RequestBody RegisterDto registerDto) throws MessagingException {
        return new ResponseEntity<>(registrationService.register(registerDto), HttpStatus.CREATED);
    }

    @PostMapping(ACTIVATE + "/{activationToken}")
    public ResponseEntity<MessageResponse> activateAccount(@PathVariable String activationToken) throws TokenException {
        return ResponseEntity.ok(registrationService.activate(activationToken));
    }
}
