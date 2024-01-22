package com.electron.rest.security.auth_repository;

import com.electron.rest.security.auth_entity.PasswordRecoveryToken;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface PasswordRecoveryTokenRepository extends CrudRepository<PasswordRecoveryToken, Long> {

    @Modifying
    @Query(value = "DELETE FROM password_recovery_tokens WHERE id = :id", nativeQuery = true)
    void deletePasswordRecoveryTokenById(@Param("id") Long id);

    @Modifying
    @Query(value = "DELETE FROM password_recovery_tokens WHERE user_id = :userId", nativeQuery = true)
    void deleteByUserId(@Param("userId") Long userId);

}
