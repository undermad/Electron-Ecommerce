package com.electron.rest.security.auth_entity.factory;

import com.electron.rest.security.auth_dto.RegisterDto;
import com.electron.rest.security.auth_entity.User;

public interface UserFactory {
    User createUser(RegisterDto registerDto);
}
