package com.electron.rest.security.auth_service;

import com.electron.rest.exception.RefreshTokenException;
import com.electron.rest.security.AuthUtils;
import com.electron.rest.security.auth_dto.LoginDto;
import com.electron.rest.security.auth_entity.RefreshToken;
import com.electron.rest.security.auth_repository.RefreshTokenRepository;
import com.electron.rest.security.auth_repository.UserRepository;
import com.electron.rest.security.auth_repository.projections.RefreshTokenProjection;
import com.electron.rest.security.auth_repository.projections.UserProjection;
import com.electron.rest.security.jwt.JwtProvider;
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

import static com.electron.rest.constants.ErrorMessages.*;

@Service
@Transactional
public class RefreshTokenServiceImpl implements RefreshTokenService {

    @Value("${app-refresh-token-expiration-millisecond}")
    private String refreshTokenExpirationTime;

    private RefreshTokenRepository refreshTokenRepository;
    private RefreshTokenProvider refreshTokenProvider;
    private UserRepository userRepository;
    private JwtProvider jwtProvider;

    @Autowired
    public RefreshTokenServiceImpl(RefreshTokenRepository refreshTokenRepository, RefreshTokenProvider refreshTokenProvider, UserRepository userRepository, JwtProvider jwtProvider) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.refreshTokenProvider = refreshTokenProvider;
        this.userRepository = userRepository;
        this.jwtProvider = jwtProvider;
    }

    @Override
    public ResponseCookie getRefreshTokenCookie(LoginDto loginDto) {
        List<UserProjection> usersList = userRepository.findUserIdFromEmail(loginDto.email());
        if (usersList.isEmpty())
            throw new UsernameNotFoundException("Bad credentials");
        Long userId = usersList.get(0).getId();
        RefreshToken newToken = refreshTokenProvider.generateToken(userId);
        refreshTokenRepository.save(newToken);
        return refreshTokenProvider.createCookie(newToken.getToken());
    }

    @Override
    public ResponseCookie getLogoutCookie(HttpServletRequest request) {
        String token = refreshTokenProvider.getTokenFromHttpRequest(request);

        if (token == null) throw new RefreshTokenException(INVALID_TOKEN);
        refreshTokenRepository.deleteRefreshTokenByToken(token);

        return refreshTokenProvider.createClearCookie();
    }

    @Override
    public Boolean logoutEverywhere(HttpServletRequest request) {
        String token = AuthUtils.getTokenFromRequest(request);
        String email = jwtProvider.getEmail(token);
        List<UserProjection> userList = userRepository.findUserIdFromEmail(email);
        if(userList == null) throw new UsernameNotFoundException(USER_NOT_FOUND);
        Long userId = userList.get(0).getId();
        refreshTokenRepository.deleteRefreshTokenByUserId(userId);
        return true;
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
