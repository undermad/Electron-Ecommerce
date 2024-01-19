package com.electron.rest.security.auth_controller;

import com.electron.rest.exception.ActivationTokenException;
import com.electron.rest.security.auth_dto.AccountActivationResponse;
import com.electron.rest.security.auth_dto.RegisterDto;
import com.electron.rest.security.auth_dto.RegisterResponse;
import com.electron.rest.security.auth_service.RegistrationService;
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
    public ResponseEntity<AccountActivationResponse> activateAccount(@PathVariable String activationToken) throws ActivationTokenException {
        return ResponseEntity.ok(registrationService.activate(activationToken));
    }
}
