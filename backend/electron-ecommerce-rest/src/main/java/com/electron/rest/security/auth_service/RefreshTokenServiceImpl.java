package com.electron.rest.security.auth_service;

import com.electron.rest.exception.RefreshTokenException;
import com.electron.rest.exception.UnauthorizedException;
import com.electron.rest.security.AuthUtils;
import com.electron.rest.security.auth_dto.LoginDto;
import com.electron.rest.security.auth_entity.RefreshToken;
import com.electron.rest.security.auth_entity.User;
import com.electron.rest.security.auth_repository.RefreshTokenRepository;
import com.electron.rest.security.auth_repository.UserRepository;
import com.electron.rest.security.auth_repository.projections.RefreshTokenProjection;
import com.electron.rest.security.auth_repository.projections.UserProjection;
import com.electron.rest.security.jwt.Jwt;
import com.electron.rest.security.jwt.JwtProvider;
import com.electron.rest.security.refresh_token.RefreshTokenProvider;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

import static com.electron.rest.constants.ErrorMessages.*;

@Service
@Transactional
public class RefreshTokenServiceImpl implements RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final RefreshTokenProvider refreshTokenProvider;
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    @Autowired
    public RefreshTokenServiceImpl(RefreshTokenRepository refreshTokenRepository, RefreshTokenProvider refreshTokenProvider, UserRepository userRepository, JwtProvider jwtProvider) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.refreshTokenProvider = refreshTokenProvider;
        this.userRepository = userRepository;
        this.jwtProvider = jwtProvider;
    }

    @Override
    public ResponseCookie getRefreshTokenCookie(LoginDto loginDto, Boolean remember) {
        List<UserProjection> usersList = userRepository.findUserIdFromEmail(loginDto.email());
        if (usersList.isEmpty())
            throw new UsernameNotFoundException("Bad credentials");
        if (remember) {
            RefreshToken newToken = (RefreshToken) refreshTokenProvider.generateToken(usersList.get(0).getId());
            refreshTokenRepository.save(newToken);
            return refreshTokenProvider.createCookie(newToken.getToken());
        }
        return refreshTokenProvider.createClearCookie();
    }

    @Override
    public ResponseCookie getLogoutCookie(String refreshToken) {
        if (refreshToken == null) throw new RefreshTokenException(INVALID_TOKEN);
        refreshTokenRepository.deleteRefreshTokenByToken(refreshToken);

        return refreshTokenProvider.createClearCookie();
    }

    @Override
    public void logoutEverywhere(String token) {
        if(token == null) throw new UnauthorizedException(INVALID_TOKEN);
        Jwt jwt = new Jwt(AuthUtils.substringBearer(token));
        String email = jwtProvider.getSubject(jwt);

        List<UserProjection> userList = userRepository.findUserIdFromEmail(email);
        if (userList == null) throw new UsernameNotFoundException(USER_NOT_FOUND);
        Long userId = userList.get(0).getId();
        refreshTokenRepository.deleteRefreshTokenByUserId(userId);
    }

    @Override
    public Boolean isTokenUpToDate(String token) {
        if (token == null) throw new RefreshTokenException(INVALID_TOKEN);
        List<RefreshTokenProjection> refreshTokenProjectionList = refreshTokenRepository.findRefreshTokenByToken(token);
        if (refreshTokenProjectionList.isEmpty())
            throw new RefreshTokenException(INVALID_TOKEN);
        RefreshTokenProjection refreshTokenProjection = refreshTokenProjectionList.get(0);

        if (refreshTokenProjection.getExpirationDate().compareTo(Instant.now()) < 0) {
            refreshTokenRepository.deleteById(refreshTokenProjection.getId());
            throw new RefreshTokenException(EXPIRED_TOKEN);
        }
        return true;
    }

}
