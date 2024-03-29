package com.electron.rest.service.auth;

import com.electron.rest.constants.AccountStatuses;
import com.electron.rest.constants.SuccessMessages;
import com.electron.rest.email.EmailService;
import com.electron.rest.email.EmailSettings;
import com.electron.rest.email.EmailSettingsFactory;
import com.electron.rest.exception.TokenException;
import com.electron.rest.exception.ApiException;
import com.electron.rest.exception.EmailAlreadyExistException;
import com.electron.rest.exception.InvalidInputException;
import com.electron.rest.dto.auth.MessageResponse;
import com.electron.rest.dto.auth.RegisterDto;
import com.electron.rest.dto.auth.RegisterResponse;
import com.electron.rest.entity.user.ActivationToken;
import com.electron.rest.entity.user.User;
import com.electron.rest.entity.user.UserFactory;
import com.electron.rest.entity.projections.AccountStatusProjection;
import com.electron.rest.entity.projections.ActivationTokenProjection;
import com.electron.rest.repository.auth.AccountStatusRepository;
import com.electron.rest.repository.auth.ActivationTokenRepository;
import com.electron.rest.repository.auth.UserRepository;
import com.electron.rest.entity.projections.UserProjection;
import com.electron.rest.security.token.activation_token.ActivationTokenProvider;
import jakarta.mail.MessagingException;
import org.springframework.transaction.annotation.Transactional;
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
    private final UserFactory<RegisterDto> regularUserFactory;

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
        if (!registerDto.password().equals(registerDto.rePassword()))
            throw new InvalidInputException(PASSWORDS_MUST_BE_SAME);
        List<UserProjection> usersList = userRepository.findUserEmailByEmail(registerDto.email());
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
    public MessageResponse activate(String activationToken) throws TokenException {
        Long tokenId = activationTokenRepository.findActivationTokenIdByToken(activationToken)
                .orElseThrow(() -> new TokenException(INVALID_TOKEN)).getId();

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
