package com.electron.rest.security.auth_service;

import com.electron.rest.security.auth_dto.LoginDto;
import com.electron.rest.security.auth_entity.RefreshToken;
import com.electron.rest.security.auth_repository.UserRepository;
import com.electron.rest.security.auth_repository.projections.UserProjection;
import com.electron.rest.security.jwt.JwtProvider;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService{

    private AuthenticationManager authenticationManager;
    private JwtProvider jwtProvider;
    private RefreshTokenService refreshTokenService;
    private UserRepository userRepository;

    public AuthServiceImpl(AuthenticationManager authenticationManager, JwtProvider jwtProvider, RefreshTokenService refreshTokenService, UserRepository userRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtProvider = jwtProvider;
        this.refreshTokenService = refreshTokenService;
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
    public ResponseCookie generateRefreshTokenCookieFromLoginDto(LoginDto loginDto) {
        RefreshToken refreshToken = refreshTokenService.generateToken(userRepository.getUserIdFromEmail(loginDto.email()).get(0).getId());
        return jwtProvider.generateRefreshJwtCookie(refreshToken.getToken());
    }

    @Override
    public String generateJwtFromRefreshToken(String refreshToken) {
        UserProjection user = userRepository.getUserByRefreshToken(refreshToken).get(0);
        return jwtProvider.generateToken(user.getEmail());
    }


}
