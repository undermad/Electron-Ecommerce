package com.electron.rest.security.auth_service;

import com.electron.rest.constants.SuccessMessages;
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
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.electron.rest.constants.ErrorMessages.EMAIL_ALREADY_IN_USE;
import static com.electron.rest.constants.ErrorMessages.PASSWORDS_MUST_BE_SAME;

@Service
@Transactional
public class RegistrationServiceImpl implements RegistrationService {

    private final UserRepository userRepository;
    private final ActivationTokenRepository activationTokenRepository;
    private final ActivationTokenProvider activationTokenProvider;

    @Qualifier("regularUserFactory")
    private final UserFactory regularUserFactory;

    public RegistrationServiceImpl(UserRepository userRepository, ActivationTokenRepository activationTokenRepository, ActivationTokenProvider activationTokenProvider, UserFactory regularUserFactory) {
        this.userRepository = userRepository;
        this.activationTokenRepository = activationTokenRepository;
        this.activationTokenProvider = activationTokenProvider;
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

        return new RegisterResponse(SuccessMessages.REGISTER_SUCCESS);
    }
}
