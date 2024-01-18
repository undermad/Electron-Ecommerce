package com.electron.rest.security.auth_service;

import com.electron.rest.constants.SuccessMessages;
import com.electron.rest.email.EmailService;
import com.electron.rest.email.EmailSettings;
import com.electron.rest.email.EmailSettingsFactory;
import com.electron.rest.exception.ApiException;
import com.electron.rest.exception.EmailAlreadyExistException;
import com.electron.rest.exception.InvalidInputException;
import com.electron.rest.security.auth_dto.RegisterDto;
import com.electron.rest.security.auth_dto.RegisterResponse;
import com.electron.rest.security.auth_entity.ActivationToken;
import com.electron.rest.security.auth_entity.User;
import com.electron.rest.security.auth_entity.factory.UserFactory;
import com.electron.rest.security.auth_repository.ActivationTokenRepository;
import com.electron.rest.security.auth_repository.UserRepository;
import com.electron.rest.security.auth_repository.projections.UserProjection;
import com.electron.rest.security.token.activation_token.ActivationTokenProvider;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.electron.rest.constants.ErrorMessages.*;

@Service
@Transactional
public class RegistrationServiceImpl implements RegistrationService {

    private final UserRepository userRepository;
    private final ActivationTokenRepository activationTokenRepository;
    private final ActivationTokenProvider activationTokenProvider;
    private final EmailService emailService;

    @Qualifier("activationEmailSettings")
    private final EmailSettingsFactory<ActivationToken> emailSettingsFactory;

    @Qualifier("regularUserFactory")
    private final UserFactory regularUserFactory;

    public RegistrationServiceImpl(UserRepository userRepository, ActivationTokenRepository activationTokenRepository, ActivationTokenProvider activationTokenProvider, EmailService emailService, EmailSettingsFactory emailSettingsFactory, UserFactory regularUserFactory) {
        this.userRepository = userRepository;
        this.activationTokenRepository = activationTokenRepository;
        this.activationTokenProvider = activationTokenProvider;
        this.emailService = emailService;
        this.emailSettingsFactory = emailSettingsFactory;
        this.regularUserFactory = regularUserFactory;
    }


    @Override
    public RegisterResponse register(RegisterDto registerDto) throws MessagingException {
        if (!registerDto.password().equals(registerDto.reEnteredPassword()))
            throw new InvalidInputException(PASSWORDS_MUST_BE_SAME);
        List<UserProjection> usersList = userRepository.findUserEmail(registerDto.email());
        if (!usersList.isEmpty()) throw new EmailAlreadyExistException(EMAIL_ALREADY_IN_USE);

        User newUser = regularUserFactory.createUser(registerDto);
        ActivationToken savedActivationToken = activationTokenRepository.save((ActivationToken) activationTokenProvider.generateToken(newUser));
        newUser.setActivationToken(savedActivationToken);
        User savedUser = userRepository.save(newUser);

        EmailSettings activationEmailSettings = emailSettingsFactory.createSettings(savedUser.getActivationToken());
        emailService.sendThymeleafEmail(activationEmailSettings);

        return new RegisterResponse(SuccessMessages.REGISTER_SUCCESS);
    }
}
