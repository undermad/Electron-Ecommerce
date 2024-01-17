package com.electron.rest.security.auth_controller;

import com.electron.rest.security.auth_dto.RegisterDto;
import com.electron.rest.security.auth_dto.RegisterResponse;
import com.electron.rest.security.auth_service.RegistrationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.electron.rest.constants.EndpointsPaths.API_V1_REGISTRATION;
import static com.electron.rest.constants.EndpointsPaths.REGISTER;

@RestController
@RequestMapping(API_V1_REGISTRATION)
public class RegistrationController {

    private final RegistrationService registrationService;

    public RegistrationController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    @PostMapping(REGISTER)
    public ResponseEntity<RegisterResponse> register(@Valid @RequestBody RegisterDto registerDto) {
        return new ResponseEntity<>(registrationService.register(registerDto), HttpStatus.CREATED);
    }
}
