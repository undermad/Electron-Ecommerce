package com.electron.rest.security.auth_service;

import com.electron.rest.exception.RefreshTokenException;
import com.electron.rest.security.auth_entity.RefreshToken;
import com.electron.rest.security.auth_entity.User;
import com.electron.rest.security.auth_repository.RefreshTokenRepository;
import com.electron.rest.security.auth_repository.UserRepository;
import com.electron.rest.security.auth_repository.projections.RefreshTokenProjection;
import com.electron.rest.security.jwt.JwtProvider;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
public class RefreshTokenServiceImpl implements RefreshTokenService {

    @Value("${app-refresh-token-expiration-millisecond}")
    private String refreshTokenExpirationTime;

    private RefreshTokenRepository refreshTokenRepository;
    private UserRepository userRepository;
    private JwtProvider jwtProvider;

    public RefreshTokenServiceImpl(RefreshTokenRepository refreshTokenRepository, UserRepository userRepository, JwtProvider jwtProvider) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.userRepository = userRepository;
        this.jwtProvider = jwtProvider;
    }

    @Override
    public RefreshToken generateToken(Long userId) {
        RefreshToken token = new RefreshToken();
        User user = new User();
        user.setId(userId);
        token.setUser(user);
        token.setExpiryDate(Instant.now().plusMillis(Long.parseLong(refreshTokenExpirationTime)));
        token.setToken(UUID.randomUUID().toString());

        return refreshTokenRepository.save(token);
    }

    @Override
    public String isTokenUpToDate(HttpServletRequest request) {

        String refreshToken = jwtProvider.getRefreshTokenFromCookie(request);
        if (refreshToken != null) {

            RefreshTokenProjection refreshTokenProjection = refreshTokenRepository.findRefreshTokenByToken(refreshToken).get(0);

            if (refreshTokenProjection.getExpirationDate().compareTo(Instant.now()) < 0) {
                refreshTokenRepository.deleteById(refreshTokenProjection.getId());
                throw new RefreshTokenException("Refresh token expired. Please login.");
            }
            return refreshToken;
        }
        throw new RefreshTokenException("Please, login!");
    }

    @Transactional
    @Override
    public void deleteRefreshToken(Long userId){
        refreshTokenRepository.deleteTokenByUserId(userId);
    }


}
