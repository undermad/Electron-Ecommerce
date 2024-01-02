package com.electron.rest.security.auth_service;

import com.electron.rest.exception.RefreshTokenException;
import com.electron.rest.security.auth_dto.LoginDto;
import com.electron.rest.security.auth_entity.RefreshToken;
import com.electron.rest.security.auth_repository.RefreshTokenRepository;
import com.electron.rest.security.auth_repository.UserRepository;
import com.electron.rest.security.auth_repository.projections.RefreshTokenProjection;
import com.electron.rest.security.auth_repository.projections.UserProjection;
import com.electron.rest.security.refresh_token.RefreshTokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@Transactional
public class RefreshTokenServiceImpl implements RefreshTokenService {

    @Value("${app-refresh-token-expiration-millisecond}")
    private String refreshTokenExpirationTime;

    private RefreshTokenRepository refreshTokenRepository;
    private RefreshTokenProvider refreshTokenProvider;
    private UserRepository userRepository;

    @Autowired
    public RefreshTokenServiceImpl(RefreshTokenRepository refreshTokenRepository, RefreshTokenProvider refreshTokenProvider, UserRepository userRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.refreshTokenProvider = refreshTokenProvider;
        this.userRepository = userRepository;
    }

    @Override
    public ResponseCookie getRefreshTokenCookie(LoginDto loginDto) {
        List<UserProjection> usersList = userRepository.findUserIdFromEmail(loginDto.email());
        if(usersList.isEmpty())
            throw new UsernameNotFoundException("Bad credentials");
        Long userId = usersList.get(0).getId();
        deleteRefreshToken(userId);
        RefreshToken refreshToken = saveRefreshToken(refreshTokenProvider.generateToken(userId));
        return refreshTokenProvider.createRefreshTokenCookie(refreshToken.getToken());
    }

    @Override
    public RefreshToken saveRefreshToken(RefreshToken token){
        return refreshTokenRepository.save(token);
    }

    @Override
    public String isTokenUpToDate(HttpServletRequest request) {

        String refreshToken = refreshTokenProvider.getRefreshTokenFromHttpRequest(request);
        if (refreshToken != null) {

            List<RefreshTokenProjection> refreshTokenProjectionList = refreshTokenRepository.findRefreshTokenByToken(refreshToken);
            if(refreshTokenProjectionList.isEmpty())
                throw new RefreshTokenException("Invalid token");
            RefreshTokenProjection refreshTokenProjection = refreshTokenProjectionList.get(0);

            if (refreshTokenProjection.getExpirationDate().compareTo(Instant.now()) < 0) {
                refreshTokenRepository.deleteById(refreshTokenProjection.getId());
                throw new RefreshTokenException("Refresh token expired. Please login.");
            }
            return refreshToken;
        }
        throw new RefreshTokenException("Please, login!");
    }

    @Override
    public void deleteRefreshToken(Long userId){
        refreshTokenRepository.deleteTokenByUserId(userId);
    }


}
