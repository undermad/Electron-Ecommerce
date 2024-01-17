package com.electron.rest.security.auth_repository;

import com.electron.rest.security.auth_entity.ActivationToken;
import org.springframework.data.repository.CrudRepository;

public interface ActivationTokenRepository extends CrudRepository<ActivationToken, Long> {
}
