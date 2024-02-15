package com.electron.rest.service.auth;

import com.electron.rest.constants.ErrorMessages;
import com.electron.rest.dto.auth.ChangeForgottenPasswordDto;
import com.electron.rest.dto.auth.LoginDto;
import com.electron.rest.dto.auth.LoginResponse;
import com.electron.rest.dto.auth.PasswordRecoveryDto;
import com.electron.rest.email.EmailService;
import com.electron.rest.email.EmailSettings;
import com.electron.rest.email.EmailSettingsFactory;
import com.electron.rest.exception.InvalidInputException;
import com.electron.rest.exception.RefreshTokenException;
import com.electron.rest.exception.TokenException;
import com.electron.rest.exception.UnauthorizedException;
import com.electron.rest.security.AuthUtils;
import com.electron.rest.entity.user.PasswordRecoveryToken;
import com.electron.rest.entity.user.RefreshToken;
import com.electron.rest.entity.user.User;
import com.electron.rest.entity.projections.PasswordRecoveryTokenProjection;
import com.electron.rest.repository.auth.PasswordRecoveryTokenRepository;
import com.electron.rest.repository.auth.RefreshTokenRepository;
import com.electron.rest.repository.auth.RoleRepository;
import com.electron.rest.repository.auth.UserRepository;
import com.electron.rest.entity.projections.RefreshTokenProjection;
import com.electron.rest.entity.projections.RoleProjection;
import com.electron.rest.entity.projections.UserProjection;
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
import org.springframework.security.crypto.password.PasswordEncoder;
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
    private final PasswordEncoder passwordEncoder;

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
                           PasswordEncoder passwordEncoder, EmailService emailService,
                           EmailSettingsFactory<PasswordRecoveryToken> emailSettingsFactory) {
        this.authenticationManager = authenticationManager;
        this.jwtProvider = jwtProvider;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.refreshTokenProvider = refreshTokenProvider;
        this.passwordRecoveryTokenProvider = passwordRecoveryTokenProvider;
        this.passwordRecoveryTokenRepository = passwordRecoveryTokenRepository;
        this.passwordEncoder = passwordEncoder;
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
        String accountStatus = userRepository.findUserAccountStatusByEmail(loginDto.email()).getFirst().getAccountStatus();
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
        UserProjection user = usersList.getFirst();
        String accountStatus = userRepository.findUserAccountStatusByEmail(user.getEmail())
                .getFirst()
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
            throw new UsernameNotFoundException(USER_NOT_FOUND);
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
        String email = jwtProvider.getSubject(jwt);
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
        RefreshTokenProjection refreshTokenProjection = refreshTokenProjectionList.getFirst();

        if (refreshTokenProjection.getExpirationDate().compareTo(Instant.now()) < 0) {
            refreshTokenRepository.deleteById(refreshTokenProjection.getId());
            throw new RefreshTokenException(EXPIRED_TOKEN);
        }
        return true;
    }

    @Override
    public void recoverPassword(PasswordRecoveryDto passwordRecoveryDto) throws MessagingException {
        Optional<UserProjection> userAsOptional = userRepository.findUserIdFromEmail(passwordRecoveryDto.email());
        if (userAsOptional.isEmpty()) return;
        User user = new User();
        user.setId(userAsOptional.get().getId());
        user.setEmail(passwordRecoveryDto.email());
        PasswordRecoveryToken recoveryToken = (PasswordRecoveryToken) passwordRecoveryTokenProvider
                .generateToken(user);

        passwordRecoveryTokenRepository.deleteByUserId(user.getId());
        passwordRecoveryTokenRepository.save(recoveryToken);
        EmailSettings settings = emailSettingsFactory.createSettings(recoveryToken);
        emailService.sendThymeleafEmail(settings);
    }

    @Override
    public void changeForgottenPassword(String passwordRecoveryToken, ChangeForgottenPasswordDto changeForgottenPasswordDto) throws TokenException {
        if (!changeForgottenPasswordDto.newPassword().equals(changeForgottenPasswordDto.reNewPassword()))
            throw new InvalidInputException(PASSWORDS_MUST_BE_SAME);

        Optional<PasswordRecoveryTokenProjection> passwordRecoveryTokenProjectionAsOptional = passwordRecoveryTokenRepository
                .findByPasswordRecoveryToken(passwordRecoveryToken);
        if(passwordRecoveryTokenProjectionAsOptional.isEmpty()) throw new TokenException(INVALID_TOKEN);
        Long userId = passwordRecoveryTokenProjectionAsOptional.get().getUserId();

        String newEncodedPassword = passwordEncoder.encode(changeForgottenPasswordDto.newPassword());
        userRepository.updatePassword(newEncodedPassword, userId);
        passwordRecoveryTokenRepository.deleteByUserId(userId);
    }


}
