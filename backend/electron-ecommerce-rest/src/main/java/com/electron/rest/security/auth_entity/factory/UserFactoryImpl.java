package com.electron.rest.security.auth_entity.factory;

import com.electron.rest.constants.AccountStatuses;
import com.electron.rest.constants.Roles;
import com.electron.rest.security.auth_dto.RegisterDto;
import com.electron.rest.security.auth_entity.AccountStatus;
import com.electron.rest.security.auth_entity.Role;
import com.electron.rest.security.auth_entity.User;
import com.electron.rest.security.auth_repository.AccountStatusRepository;
import com.electron.rest.security.auth_repository.RoleRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

@Component
public class UserFactoryImpl implements UserFactory {

    private final PasswordEncoder passwordEncoder;
    private final AccountStatusRepository accountStatusRepository;
    private final RoleRepository roleRepository;

    public UserFactoryImpl(PasswordEncoder passwordEncoder, AccountStatusRepository accountStatusRepository, RoleRepository roleRepository) {
        this.passwordEncoder = passwordEncoder;
        this.accountStatusRepository = accountStatusRepository;
        this.roleRepository = roleRepository;
    }


    @Override
    public User createUser(RegisterDto registerDto) {
        Set<Role> roles = new HashSet<>();
        roles.add(roleRepository.findRoleByRoleName(Roles.USER));

        AccountStatus awaitingActivationStatus = accountStatusRepository
                .findAccountStatusByStatusType(AccountStatuses.AWAITING_ACTIVATION);

        return User.builder()
                .email(registerDto.email())
                .newsletterSubscription(registerDto.newsletterSubscription())
                .password(passwordEncoder.encode(registerDto.password()))
                .createdOn(Instant.now())
                .accountStatus(awaitingActivationStatus)
                .roles(roles)
                .refreshToken(null)
                .build();
    }
}
