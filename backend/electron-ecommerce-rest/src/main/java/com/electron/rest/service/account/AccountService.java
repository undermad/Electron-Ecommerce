package com.electron.rest.service.account;

import com.electron.rest.dto.account.AvatarResponse;
import com.electron.rest.dto.auth.MessageResponse;
import com.electron.rest.entity.account.Avatar;
import com.electron.rest.entity.projections.AvatarProjection;
import com.electron.rest.entity.projections.UserProjection;
import com.electron.rest.entity.user.User;
import com.electron.rest.entity.user.UserFactory;
import com.electron.rest.entity.user.UserIdFactory;
import com.electron.rest.exception.FileToBigException;
import com.electron.rest.exception.ResourceNotFoundException;
import com.electron.rest.exception.WrongFileTypeException;
import com.electron.rest.mapper.AvatarMapper;
import com.electron.rest.repository.account.AvatarRepository;
import com.electron.rest.repository.auth.UserRepository;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;

import static com.electron.rest.constants.ErrorMessages.*;

@Service
public class AccountService {


    @Qualifier(UserIdFactory.BEAN_ID)
    private final UserFactory<String> userIdFactory;

    private final UserRepository userRepository;
    private final AvatarRepository avatarRepository;
    private final AvatarMapper avatarMapper;

    public AccountService(UserFactory<String> userIdFactory, UserRepository userRepository, AvatarRepository avatarRepository, AvatarMapper avatarMapper) {
        this.userIdFactory = userIdFactory;
        this.userRepository = userRepository;
        this.avatarRepository = avatarRepository;
        this.avatarMapper = avatarMapper;
    }

    public String getUserFullName(String jwt) {
        User user = userIdFactory.createUser(jwt);
        UserProjection userProjection = userRepository.getUserFullName(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException(USER_NOT_FOUND));
        return userProjection.getFirstName() + " " + userProjection.getLastName();
    }

    @Transactional
    public void changeAvatar(MultipartFile file, String jwt) throws IOException {
        User user = userIdFactory.createUser(jwt);
        String[] allowedTypes = {"image/jpeg", "image/png", "image/gif"};
        if (!Arrays.asList(allowedTypes).contains(file.getContentType()))
            throw new WrongFileTypeException(WRONG_FORMAT);

        if (file.getSize() > 1048576)
            throw new FileToBigException(MAX_FILE_SIZE_1MB);

        avatarRepository.deleteAvatar(user.getId());

        Avatar avatar = Avatar.builder()
                .fileName(file.getName())
                .fileType(file.getContentType())
                .data(file.getBytes())
                .user(user)
                .build();

        avatarRepository.save(avatar);
    }

    public AvatarResponse getAvatar(String jwt) {
        User userId = userIdFactory.createUser(jwt);
        AvatarProjection avatarProjection = avatarRepository.getUserAvatar(userId.getId())
                .orElseThrow(() -> new ResourceNotFoundException(AVATAR_NOT_FOUND));
        return avatarMapper.mapProjectionToAvatarResponse(avatarProjection);
    }

}
