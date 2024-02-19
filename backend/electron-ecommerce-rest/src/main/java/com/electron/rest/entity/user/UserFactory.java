package com.electron.rest.entity.user;

public interface UserFactory<T> {
    User createUser(T value);
}
