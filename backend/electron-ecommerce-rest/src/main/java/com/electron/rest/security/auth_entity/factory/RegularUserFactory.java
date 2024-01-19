package com.electron.rest.security.auth_entity.factory;

import com.electron.rest.constants.AccountStatuses;
import com.electron.rest.constants.ErrorMessages;
import com.electron.rest.constants.Roles;
import com.electron.rest.exception.ApiException;
import com.electron.rest.security.auth_dto.RegisterDto;
import com.electron.rest.security.auth_entity.AccountStatus;
import com.electron.rest.security.auth_entity.ActivationToken;
import com.electron.rest.security.auth_entity.Role;
import com.electron.rest.security.auth_entity.User;
import com.electron.rest.security.auth_repository.AccountStatusRepository;
import com.electron.rest.security.auth_repository.RoleRepository;
import com.electron.rest.security.token.activation_token.ActivationTokenProvider;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import static com.electron.rest.constants.ErrorMessages.STATUS_NOT_FOUND;

@Component("regularUserFactory")
public class RegularUserFactory implements UserFactory {

    private final PasswordEncoder passwordEncoder;
    private final AccountStatusRepository accountStatusRepository;
    private final RoleRepository roleRepository;

    public RegularUserFactory(PasswordEncoder passwordEncoder, AccountStatusRepository accountStatusRepository, RoleRepository roleRepository) {
        this.passwordEncoder = passwordEncoder;
        this.accountStatusRepository = accountStatusRepository;
        this.roleRepository = roleRepository;
    }


    @Override
    public User createUser(RegisterDto registerDto) {
        Set<Role> roles = new HashSet<>();
        roles.add(roleRepository.findRoleByRoleName(Roles.USER));

        Optional<AccountStatus> awaitingActivationStatusAsOptional = accountStatusRepository
                .findAccountStatusByStatusType(AccountStatuses.AWAITING_ACTIVATION);

        if(awaitingActivationStatusAsOptional.isEmpty()) throw new ApiException(STATUS_NOT_FOUND);


        return User.builder()
                .email(registerDto.email())
                .firstName(registerDto.firstName())
                .lastName(registerDto.lastName())
                .newsletterSubscription(registerDto.newsletterSubscription())
                .password(passwordEncoder.encode(registerDto.password()))
                .createdOn(Instant.now())
                .accountStatus(awaitingActivationStatusAsOptional.get())
                .roles(roles)
                .refreshTokens(null)
                .build();
    }
}
