package com.electron.rest.security.auth_service;

import com.electron.rest.exception.RefreshTokenException;
import com.electron.rest.security.auth_entity.RefreshToken;
import com.electron.rest.security.auth_entity.User;
import com.electron.rest.security.auth_repository.RefreshTokenRepository;
import com.electron.rest.security.auth_repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
public class RefreshTokenServiceImpl implements RefreshTokenService {

    @Value("${app-refresh-token-expiration-millisecond}")
    private String refreshTokenExpirationTime;

    private RefreshTokenRepository refreshTokenRepository;
    private UserRepository userRepository;

    public RefreshTokenServiceImpl(RefreshTokenRepository refreshTokenRepository, UserRepository userRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.userRepository = userRepository;
    }

    @Override
    public RefreshToken generateToken(Long userId) {
        RefreshToken token = new RefreshToken();

        Optional<User> userAsOptional = userRepository.findById(userId);
        if (userAsOptional.isEmpty()) {
            throw new UsernameNotFoundException("User not found");
        }
        token.setUser(userAsOptional.get());
        token.setExpiryDate(Instant.now().plusMillis(Long.parseLong(refreshTokenExpirationTime)));
        token.setToken(UUID.randomUUID().toString());

        return refreshTokenRepository.save(token);
    }

    @Override
    public boolean isTokenUpToDate(Instant expirationDate, Long tokenId) {

        if(expirationDate.compareTo(Instant.now()) < 0) {
            refreshTokenRepository.deleteById(tokenId);
            throw new RefreshTokenException("Refresh token expired. Please login.");
        }

        return true;
    }


}
