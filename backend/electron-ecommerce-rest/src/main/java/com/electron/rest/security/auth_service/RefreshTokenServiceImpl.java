package com.electron.rest.security.auth_service;

import com.electron.rest.exception.RefreshTokenException;
import com.electron.rest.security.auth_dto.LoginDto;
import com.electron.rest.security.auth_entity.RefreshToken;
import com.electron.rest.security.auth_repository.RefreshTokenRepository;
import com.electron.rest.security.auth_repository.UserRepository;
import com.electron.rest.security.auth_repository.projections.RefreshTokenProjection;
import com.electron.rest.security.auth_repository.projections.UserProjection;
import com.electron.rest.security.refresh_token.RefreshTokenProviderImpl;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

import static com.electron.rest.constants.ErrorMessages.INVALID_TOKEN;
import static com.electron.rest.constants.ErrorMessages.EXPIRED_TOKEN;

@Service
@Transactional
public class RefreshTokenServiceImpl implements RefreshTokenService {

    @Value("${app-refresh-token-expiration-millisecond}")
    private String refreshTokenExpirationTime;

    private RefreshTokenRepository refreshTokenRepository;
    private RefreshTokenProviderImpl refreshTokenProvider;
    private UserRepository userRepository;

    @Autowired
    public RefreshTokenServiceImpl(RefreshTokenRepository refreshTokenRepository, RefreshTokenProviderImpl refreshTokenProvider, UserRepository userRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.refreshTokenProvider = refreshTokenProvider;
        this.userRepository = userRepository;
    }

    @Override
    public ResponseCookie createCookie(LoginDto loginDto) {
        List<UserProjection> usersList = userRepository.findUserIdFromEmail(loginDto.email());
        if (usersList.isEmpty())
            throw new UsernameNotFoundException("Bad credentials");
        Long userId = usersList.get(0).getId();
        refreshTokenRepository.deleteRefreshTokenByUserId(userId);
        RefreshToken newToken = refreshTokenProvider.generateToken(userId);
        refreshTokenRepository.save(newToken);
        return refreshTokenProvider.createCookie(newToken.getToken());
    }

    @Override
    public ResponseCookie createClearCookie(HttpServletRequest request) {
        String token = refreshTokenProvider.getTokenFromHttpRequest(request);

        if (token == null) throw new RefreshTokenException(INVALID_TOKEN);
        refreshTokenRepository.deleteRefreshTokenByToken(token);

        return refreshTokenProvider.createClearCookie();
    }

    @Override
    public String isTokenUpToDate(HttpServletRequest request) {

        String token = refreshTokenProvider.getTokenFromHttpRequest(request);
        if (token != null) {

            List<RefreshTokenProjection> refreshTokenProjectionList = refreshTokenRepository.findRefreshTokenByToken(token);
            if (refreshTokenProjectionList.isEmpty())
                throw new RefreshTokenException("Invalid token");
            RefreshTokenProjection refreshTokenProjection = refreshTokenProjectionList.get(0);

            if (refreshTokenProjection.getExpirationDate().compareTo(Instant.now()) < 0) {
                refreshTokenRepository.deleteById(refreshTokenProjection.getId());
                throw new RefreshTokenException("Refresh token expired. Please login.");
            }
            return token;
        }
        throw new RefreshTokenException(EXPIRED_TOKEN);
    }


}
