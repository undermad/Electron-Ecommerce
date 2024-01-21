package com.electron.rest.security.auth_repository;

import com.electron.rest.security.auth_entity.PasswordRecoveryToken;
import org.springframework.data.repository.CrudRepository;

public interface PasswordRecoveryTokenRepository extends CrudRepository<PasswordRecoveryToken, Long> {


}
