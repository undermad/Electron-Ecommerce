package com.electron.rest.entity.factory;

import com.electron.rest.dto.RegisterDto;
import com.electron.rest.entity.user.User;

public interface UserFactory {
    User createUser(RegisterDto registerDto);
}
