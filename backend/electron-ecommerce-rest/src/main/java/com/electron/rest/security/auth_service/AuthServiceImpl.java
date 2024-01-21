package com.electron.rest.security.auth_service;

import com.electron.rest.constants.ErrorMessages;
import com.electron.rest.email.EmailService;
import com.electron.rest.email.EmailSettings;
import com.electron.rest.email.EmailSettingsFactory;
import com.electron.rest.exception.RefreshTokenException;
import com.electron.rest.exception.UnauthorizedException;
import com.electron.rest.security.AuthUtils;
import com.electron.rest.security.auth_dto.*;
import com.electron.rest.security.auth_entity.PasswordRecoveryToken;
import com.electron.rest.security.auth_entity.RefreshToken;
import com.electron.rest.security.auth_entity.User;
import com.electron.rest.security.auth_repository.PasswordRecoveryTokenRepository;
import com.electron.rest.security.auth_repository.RefreshTokenRepository;
import com.electron.rest.security.auth_repository.RoleRepository;
import com.electron.rest.security.auth_repository.UserRepository;
import com.electron.rest.security.auth_entity.projections.RefreshTokenProjection;
import com.electron.rest.security.auth_entity.projections.RoleProjection;
import com.electron.rest.security.auth_entity.projections.UserProjection;
import com.electron.rest.security.token.jwt.Jwt;
import com.electron.rest.security.token.jwt.JwtProvider;
import com.electron.rest.security.token.password_recovery_token.PasswordRecoveryTokenProvider;
import com.electron.rest.security.token.refresh_token.RefreshTokenProvider;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
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
    private final RefreshTokenRepository refreshTokenRepository;
    private final RefreshTokenProvider refreshTokenProvider;
    private final PasswordRecoveryTokenProvider passwordRecoveryTokenProvider;
    private final PasswordRecoveryTokenRepository passwordRecoveryTokenRepository;

    private final EmailService emailService;

    @Qualifier("passwordRecoveryEmailSettings")
    private final EmailSettingsFactory<PasswordRecoveryToken> emailSettingsFactory;


    public AuthServiceImpl(AuthenticationManager authenticationManager,
                           JwtProvider jwtProvider,
                           UserRepository userRepository,
                           RoleRepository roleRepository,
                           RefreshTokenRepository refreshTokenRepository,
                           RefreshTokenProvider refreshTokenProvider,
                           PasswordRecoveryTokenProvider passwordRecoveryTokenProvider,
                           PasswordRecoveryTokenRepository passwordRecoveryTokenRepository,
                           EmailService emailService,
                           EmailSettingsFactory<PasswordRecoveryToken> emailSettingsFactory) {
        this.authenticationManager = authenticationManager;
        this.jwtProvider = jwtProvider;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.refreshTokenProvider = refreshTokenProvider;
        this.passwordRecoveryTokenProvider = passwordRecoveryTokenProvider;
        this.passwordRecoveryTokenRepository = passwordRecoveryTokenRepository;
        this.emailService = emailService;
        this.emailSettingsFactory = emailSettingsFactory;
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
    public ResponseCookie getRefreshTokenCookie(LoginDto loginDto, Boolean remember) {
        Optional<UserProjection> userAsOptional = userRepository.findUserIdFromEmail(loginDto.email());
        if (userAsOptional.isEmpty())
            throw new UsernameNotFoundException(BAD_CREDENTIALS);
        if (remember) {
            RefreshToken newToken = (RefreshToken) refreshTokenProvider.generateToken(userAsOptional.get().getId());
            refreshTokenRepository.save(newToken);
            return refreshTokenProvider.createCookie(newToken.getToken());
        }
        return refreshTokenProvider.createClearCookie();
    }

    @Override
    public ResponseCookie logout(String refreshToken) {
        if (refreshToken == null) throw new RefreshTokenException(INVALID_TOKEN);
        refreshTokenRepository.deleteRefreshTokenByToken(refreshToken);

        return refreshTokenProvider.createClearCookie();
    }

    @Override
    public void logoutEverywhere(String jwt) {
        if (jwt == null) throw new UnauthorizedException(INVALID_TOKEN);
        Jwt jwToken = new Jwt(AuthUtils.substringBearer(jwt));
        String email = jwtProvider.getSubject(jwToken);

        Optional<UserProjection> userAsOptional = userRepository.findUserIdFromEmail(email);
        if (userAsOptional.isEmpty()) throw new UsernameNotFoundException(USER_NOT_FOUND);
        Long userId = userAsOptional.get().getId();
        refreshTokenRepository.deleteRefreshTokenByUserId(userId);
    }

    @Override
    public Boolean isRefreshTokenUpToDate(String token) {
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

    @Override
    public void recoverPassword(PasswordRecoveryDto passwordRecoveryDto) throws MessagingException {
        Optional<UserProjection> userAsOptional = userRepository.findUserIdFromEmail(passwordRecoveryDto.email());
        if(userAsOptional.isEmpty()) return;
        User user = new User();
        user.setId(userAsOptional.get().getId());
        user.setEmail(passwordRecoveryDto.email());
        PasswordRecoveryToken recoveryToken = (PasswordRecoveryToken) passwordRecoveryTokenProvider
                .generateToken(user);
        PasswordRecoveryToken savedPasswordRecoveryToken = passwordRecoveryTokenRepository.save(recoveryToken);
        userRepository.updatePasswordRecoveryToken(savedPasswordRecoveryToken.getId(), user.getId());

        EmailSettings settings = emailSettingsFactory.createSettings(recoveryToken);
        emailService.sendThymeleafEmail(settings);
    }


}
