package com.electron.rest.mapper;

import com.electron.rest.dto.account.AvatarResponse;
import com.electron.rest.entity.projections.AvatarProjection;
import org.springframework.stereotype.Component;

@Component
public class AvatarMapper {

    public AvatarResponse mapProjectionToAvatarResponse(AvatarProjection avatarProjection) {
        return AvatarResponse.builder()
                .id(avatarProjection.getId())
                .fileName(avatarProjection.getFileName())
                .fileType(avatarProjection.getFileType())
                .data(avatarProjection.getData())
                .build();
    }
}
