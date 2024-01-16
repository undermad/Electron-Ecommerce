package com.electron.rest.security.auth_service;

import com.electron.rest.constants.ErrorMessages;
import com.electron.rest.constants.SuccessMessages;
import com.electron.rest.exception.EmailAlreadyExistException;
import com.electron.rest.exception.InvalidInputException;
import com.electron.rest.security.auth_dto.*;
import com.electron.rest.security.auth_entity.User;
import com.electron.rest.security.auth_entity.factory.UserFactory;
import com.electron.rest.security.auth_repository.RoleRepository;
import com.electron.rest.security.auth_repository.UserRepository;
import com.electron.rest.security.auth_repository.projections.RoleProjection;
import com.electron.rest.security.auth_repository.projections.UserProjection;
import com.electron.rest.security.jwt.Jwt;
import com.electron.rest.security.jwt.JwtProvider;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static com.electron.rest.constants.ErrorMessages.*;

@Service
@Transactional
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Qualifier("regularUserFactory")
    private final UserFactory regularUserFactory;

    public AuthServiceImpl(AuthenticationManager authenticationManager, JwtProvider jwtProvider, UserRepository userRepository, RoleRepository roleRepository, UserFactory regularUserFactory) {
        this.authenticationManager = authenticationManager;
        this.jwtProvider = jwtProvider;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.regularUserFactory = regularUserFactory;
    }

    @Override
    public LoginResponse login(LoginDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.email(),
                loginDto.password()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        Jwt token = (Jwt) jwtProvider.generateToken(authentication.getName());
        String accountStatus = userRepository.findUserAccountStatusByEmail(loginDto.email()).get(0).getAccountStatus();
        Set<String> roles = authentication.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toSet());

        return new LoginResponse(token.getValue(), roles, accountStatus);
    }

    @Override
    public LoginResponse refreshJwt(String refreshToken) {

        List<UserProjection> usersList = userRepository.findUserIdAndEmailByRefreshToken(refreshToken);
        if (usersList.isEmpty())
            throw new UsernameNotFoundException(ErrorMessages.USER_NOT_FOUND);
        UserProjection user = usersList.get(0);
        String accountStatus = userRepository.findUserAccountStatusByEmail(user.getEmail())
                .get(0)
                .getAccountStatus();
        Set<String> roles = roleRepository.getRolesByUserId(user.getId())
                .stream()
                .map(RoleProjection::getRoleName)
                .collect(Collectors.toSet());
        Jwt token = (Jwt) jwtProvider.generateToken(user.getEmail());

        return new LoginResponse(token.getValue(), roles, accountStatus);
    }

    @Override
    public RegisterResponse register(RegisterDto registerDto) {
        if(!registerDto.password().equals(registerDto.reEnteredPassword())) throw new InvalidInputException(PASSWORDS_MUST_BE_SAME);
        List<UserProjection> usersList = userRepository.findUserEmail(registerDto.email());
        if (!usersList.isEmpty()) throw new EmailAlreadyExistException(EMAIL_ALREADY_IN_USE);

        User newUser = regularUserFactory.createUser(registerDto);
        userRepository.save(newUser);

        return new RegisterResponse(SuccessMessages.REGISTER_SUCCESS);
    }


}
