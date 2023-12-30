package com.electron.rest.security.auth_service;

import com.electron.rest.security.auth_dto.LoginDto;
import com.electron.rest.security.auth_repository.UserRepository;
import com.electron.rest.security.auth_repository.projections.UserProjection;
import com.electron.rest.security.jwt.JwtProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;

    public AuthServiceImpl(AuthenticationManager authenticationManager, JwtProvider jwtProvider, UserRepository userRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtProvider = jwtProvider;
        this.userRepository = userRepository;
    }

    @Override
    public String login(LoginDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.email(),
                loginDto.password()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return jwtProvider.generateTokenFromAuthentication(authentication);
    }

    @Override
    public String refreshJwt(String refreshToken) {
        List<UserProjection> userList = userRepository.getUserByRefreshToken(refreshToken);
        if(userList.isEmpty())
            throw new UsernameNotFoundException("User not found.");
        UserProjection user = userList.get(0);
        return jwtProvider.generateToken(user.getEmail());
    }


}
