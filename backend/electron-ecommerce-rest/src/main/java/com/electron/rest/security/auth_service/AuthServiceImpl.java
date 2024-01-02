package com.electron.rest.security.auth_service;

import com.electron.rest.constants.AccountStatuses;
import com.electron.rest.constants.ErrorResponses;
import com.electron.rest.constants.Roles;
import com.electron.rest.constants.SuccessResponses;
import com.electron.rest.exception.EmailAlreadyExistException;
import com.electron.rest.security.auth_dto.JwtResponse;
import com.electron.rest.security.auth_dto.LoginDto;
import com.electron.rest.security.auth_dto.RegisterDto;
import com.electron.rest.security.auth_dto.RegisterResponse;
import com.electron.rest.security.auth_entity.AccountStatus;
import com.electron.rest.security.auth_entity.RefreshToken;
import com.electron.rest.security.auth_entity.Role;
import com.electron.rest.security.auth_entity.User;
import com.electron.rest.security.auth_repository.AccountStatusRepository;
import com.electron.rest.security.auth_repository.RoleRepository;
import com.electron.rest.security.auth_repository.UserRepository;
import com.electron.rest.security.auth_repository.projections.UserProjection;
import com.electron.rest.security.jwt.JwtProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;
    private final AccountStatusRepository accountStatusRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthServiceImpl(AuthenticationManager authenticationManager, JwtProvider jwtProvider, UserRepository userRepository, AccountStatusRepository repository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.jwtProvider = jwtProvider;
        this.userRepository = userRepository;
        this.accountStatusRepository = repository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public JwtResponse login(LoginDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.email(),
                loginDto.password()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return new JwtResponse(jwtProvider.generateTokenFromAuthentication(authentication));
    }

    @Override
    public JwtResponse refreshJwt(String refreshToken) {
        List<UserProjection> usersList = userRepository.findUserByRefreshToken(refreshToken);
        if (usersList.isEmpty())
            throw new UsernameNotFoundException("User not found.");
        UserProjection user = usersList.get(0);
        return new JwtResponse(jwtProvider.generateToken(user.getEmail()));
    }

    @Override
    public RegisterResponse register(RegisterDto registerDto) {
        List<UserProjection> usersList = userRepository.findUserEmail(registerDto.email());
        if (!usersList.isEmpty()) throw new EmailAlreadyExistException(ErrorResponses.EMAIL_ALREADY_IN_USE);

        Set<Role> roles = new HashSet<>();
        roles.add(roleRepository.findRoleByRoleName(Roles.USER));

        AccountStatus awaitingActivationStatus = accountStatusRepository
                .findAccountStatusByStatusType(AccountStatuses.AWAITING_ACTIVATION);

        User newUser = User.builder()
                .email(registerDto.email())
                .newsletterSubscription(registerDto.newsletterSubscription())
                .password(passwordEncoder.encode(registerDto.password()))
                .createdOn(Instant.now())
                .accountStatus(awaitingActivationStatus)
                .roles(roles)
                .refreshToken(null)
                .build();

        userRepository.save(newUser);

        return new RegisterResponse(SuccessResponses.REGISTER_SUCCESS);
    }


}
