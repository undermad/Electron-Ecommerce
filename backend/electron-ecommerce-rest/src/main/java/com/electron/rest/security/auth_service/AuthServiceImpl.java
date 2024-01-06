package com.electron.rest.security.auth_service;

import com.electron.rest.constants.ErrorMessages;
import com.electron.rest.constants.SuccessMessages;
import com.electron.rest.exception.EmailAlreadyExistException;
import com.electron.rest.security.auth_dto.*;
import com.electron.rest.security.auth_entity.User;
import com.electron.rest.security.auth_entity.factory.UserFactory;
import com.electron.rest.security.auth_repository.UserRepository;
import com.electron.rest.security.auth_repository.projections.UserProjection;
import com.electron.rest.security.jwt.JwtProvider;
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

@Service
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;
    private final UserFactory userFactory;

    public AuthServiceImpl(AuthenticationManager authenticationManager, JwtProvider jwtProvider, UserRepository userRepository, UserFactory userFactory) {
        this.authenticationManager = authenticationManager;
        this.jwtProvider = jwtProvider;
        this.userRepository = userRepository;
        this.userFactory = userFactory;
    }

    @Override
    public LoginResponse login(LoginDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.email(),
                loginDto.password()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtProvider.generateTokenFromAuthentication(authentication);
        Set<String> roles = authentication.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toSet());
        return new LoginResponse(token, roles);
    }

    @Override
    public JwtResponse refreshJwt(String refreshToken) {
        List<UserProjection> usersList = userRepository.findUserByRefreshToken(refreshToken);
        if (usersList.isEmpty())
            throw new UsernameNotFoundException(ErrorMessages.USER_NOT_FOUND);
        UserProjection user = usersList.get(0);
        return new JwtResponse(jwtProvider.generateToken(user.getEmail()));
    }

    @Override
    public RegisterResponse register(RegisterDto registerDto) {
        List<UserProjection> usersList = userRepository.findUserEmail(registerDto.email());
        if (!usersList.isEmpty()) throw new EmailAlreadyExistException(ErrorMessages.EMAIL_ALREADY_IN_USE);

        User newUser = userFactory.createUser(registerDto);
        userRepository.save(newUser);

        return new RegisterResponse(SuccessMessages.REGISTER_SUCCESS);
    }


}
