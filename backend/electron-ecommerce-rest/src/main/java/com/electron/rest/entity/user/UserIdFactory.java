package com.electron.rest.entity.user;

import com.electron.rest.constants.ErrorMessages;
import com.electron.rest.repository.auth.UserRepository;
import com.electron.rest.security.token.jwt.JwtProvider;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component("userIdFactory")
public class UserIdFactory implements UserFactory<String> {

    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;

    public UserIdFactory(JwtProvider jwtProvider, UserRepository userRepository) {
        this.jwtProvider = jwtProvider;
        this.userRepository = userRepository;
    }

    @Override
    public User createUser(String jwt) {
        String email = jwtProvider.getSubject(jwt);
        Long userId = userRepository.findUserIdFromEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(ErrorMessages.USER_NOT_FOUND))
                .getId();
        User user = new User();
        user.setId(userId);
        return user;
    }
}
