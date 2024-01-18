package com.electron.rest.email;

public interface EmailSettingsFactory<T> {
    EmailSettings createSettings(T value);
}
