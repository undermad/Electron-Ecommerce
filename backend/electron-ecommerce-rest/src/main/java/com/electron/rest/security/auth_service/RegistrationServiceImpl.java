package com.electron.rest.security.auth_service;

import com.electron.rest.constants.SuccessMessages;
import com.electron.rest.email.EmailService;
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
import java.util.Map;

import static com.electron.rest.constants.ErrorMessages.EMAIL_ALREADY_IN_USE;
import static com.electron.rest.constants.ErrorMessages.PASSWORDS_MUST_BE_SAME;

@Service
@Transactional
public class RegistrationServiceImpl implements RegistrationService {

    private final UserRepository userRepository;
    private final ActivationTokenRepository activationTokenRepository;
    private final ActivationTokenProvider activationTokenProvider;
    private final EmailService emailService;

    @Qualifier("regularUserFactory")
    private final UserFactory regularUserFactory;

    public RegistrationServiceImpl(UserRepository userRepository, ActivationTokenRepository activationTokenRepository, ActivationTokenProvider activationTokenProvider, EmailService emailService, UserFactory regularUserFactory) {
        this.userRepository = userRepository;
        this.activationTokenRepository = activationTokenRepository;
        this.activationTokenProvider = activationTokenProvider;
        this.emailService = emailService;
        this.regularUserFactory = regularUserFactory;
    }


    @Override
    public RegisterResponse register(RegisterDto registerDto) {
        if (!registerDto.password().equals(registerDto.reEnteredPassword()))
            throw new InvalidInputException(PASSWORDS_MUST_BE_SAME);
        List<UserProjection> usersList = userRepository.findUserEmail(registerDto.email());
        if (!usersList.isEmpty()) throw new EmailAlreadyExistException(EMAIL_ALREADY_IN_USE);

        User newUser = regularUserFactory.createUser(registerDto);
        User savedUser = userRepository.save(newUser);
        ActivationToken activationToken = (ActivationToken) activationTokenProvider.generateToken(savedUser.getId());
        activationTokenRepository.save(activationToken);


        // NEED TO REFACTOR!!!!!
        Map<String, Object> variables = Map.of(
                "activationLink", "http://localhost:5173/activate/" + activationToken.getToken(),
                "user", savedUser);


        try {
            emailService.createThymeleafTemplate(variables, "dtworek94@gmail.com", "Activation Link");
        } catch (MessagingException e) {
            throw new ApiException("Email error");
        }


        return new RegisterResponse(SuccessMessages.REGISTER_SUCCESS);
    }
}
