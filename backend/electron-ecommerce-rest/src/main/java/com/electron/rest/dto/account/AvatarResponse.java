package com.electron.rest.dto.account;

import lombok.Builder;

@Builder
public record AvatarResponse(Long id, String fileName, String fileType, byte[] data) {
}
