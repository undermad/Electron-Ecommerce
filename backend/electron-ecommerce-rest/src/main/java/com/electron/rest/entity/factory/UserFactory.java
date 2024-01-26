package com.electron.rest.entity.factory;

import com.electron.rest.dto.auth.RegisterDto;
import com.electron.rest.entity.user.User;

public interface UserFactory {
    User createUser(RegisterDto registerDto);
}
