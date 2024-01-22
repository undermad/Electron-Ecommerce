package com.electron.rest.security.auth_service;

import com.electron.rest.constants.AccountStatuses;
import com.electron.rest.constants.SuccessMessages;
import com.electron.rest.email.EmailService;
import com.electron.rest.email.EmailSettings;
import com.electron.rest.email.EmailSettingsFactory;
import com.electron.rest.exception.ActivationTokenException;
import com.electron.rest.exception.ApiException;
import com.electron.rest.exception.EmailAlreadyExistException;
import com.electron.rest.exception.InvalidInputException;
import com.electron.rest.security.auth_dto.MessageResponse;
import com.electron.rest.security.auth_dto.RegisterDto;
import com.electron.rest.security.auth_dto.RegisterResponse;
import com.electron.rest.security.auth_entity.ActivationToken;
import com.electron.rest.security.auth_entity.User;
import com.electron.rest.security.auth_entity.factory.UserFactory;
import com.electron.rest.security.auth_entity.projections.AccountStatusProjection;
import com.electron.rest.security.auth_entity.projections.ActivationTokenProjection;
import com.electron.rest.security.auth_repository.AccountStatusRepository;
import com.electron.rest.security.auth_repository.ActivationTokenRepository;
import com.electron.rest.security.auth_repository.UserRepository;
import com.electron.rest.security.auth_entity.projections.UserProjection;
import com.electron.rest.security.token.activation_token.ActivationTokenProvider;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static com.electron.rest.constants.ErrorMessages.*;
import static com.electron.rest.constants.SuccessMessages.ACCOUNT_ACTIVATED;

@Service
@Transactional
public class RegistrationServiceImpl implements RegistrationService {

    private final UserRepository userRepository;
    private final AccountStatusRepository accountStatusRepository;
    private final ActivationTokenRepository activationTokenRepository;
    private final ActivationTokenProvider activationTokenProvider;
    private final EmailService emailService;

    @Qualifier("activationEmailSettings")
    private final EmailSettingsFactory<ActivationToken> emailSettingsFactory;

    @Qualifier("regularUserFactory")
    private final UserFactory regularUserFactory;

    public RegistrationServiceImpl(UserRepository userRepository,
                                   ActivationTokenRepository activationTokenRepository,
                                   ActivationTokenProvider activationTokenProvider,
                                   EmailService emailService,
                                   AccountStatusRepository accountStatusRepository,
                                   EmailSettingsFactory<ActivationToken> emailSettingsFactory,
                                   UserFactory regularUserFactory) {
        this.userRepository = userRepository;
        this.accountStatusRepository = accountStatusRepository;
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
        ActivationToken activationToken = (ActivationToken) activationTokenProvider.generateToken(newUser);
        newUser.setActivationToken(activationToken);
        User savedUser = userRepository.save(newUser);

        EmailSettings activationEmailSettings = emailSettingsFactory.createSettings(savedUser.getActivationToken());
        emailService.sendThymeleafEmail(activationEmailSettings);

        return new RegisterResponse(SuccessMessages.REGISTER_SUCCESS);
    }

    @Override
    public MessageResponse activate(String activationToken) throws ActivationTokenException {
        Optional<ActivationTokenProjection> tokenAsOptional = activationTokenRepository.findActivationTokenIdByToken(activationToken);
        if (tokenAsOptional.isEmpty()) throw new ActivationTokenException(INVALID_TOKEN);
        Long tokenId = tokenAsOptional.get().getId();

        Optional<AccountStatusProjection> statusAsOptional =
                accountStatusRepository.findAccountStatusIdByStatusType(AccountStatuses.ACTIVE);
        if (statusAsOptional.isEmpty()) throw new ApiException(STATUS_NOT_FOUND);
        Long statusId = statusAsOptional.get().getId();

        Optional<ActivationTokenProjection> activationTokenProjectionAsOptional = activationTokenRepository.findUserIdByActivationTokenId(tokenId);
        if(activationTokenProjectionAsOptional.isEmpty()) throw new UsernameNotFoundException(USER_NOT_FOUND);
        Long userId = activationTokenProjectionAsOptional.get().getUserId();

        userRepository.updateAccountStatus(statusId, userId);
        activationTokenRepository.deleteActivationTokenById(tokenId);

        return new MessageResponse(ACCOUNT_ACTIVATED);
    }
}
