package com.electron.rest.repository;

import com.electron.rest.entity.user.PasswordRecoveryToken;
import com.electron.rest.entity.projections.PasswordRecoveryTokenProjection;
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

    @Query(value = "SELECT t.token as token, t.expiry_date as expiryDate, t.id as id, t.user_id as userId FROM password_recovery_tokens t", nativeQuery = true)
    Optional<PasswordRecoveryTokenProjection> findByPasswordRecoveryToken(@Param("passwordRecoveryToken") String passwordRecoveryToken);

    @Modifying
    @Query(value = "DELETE FROM password_recovery_tokens t WHERE t.expiry_date < NOW()", nativeQuery = true)
    void deleteExpiredTokens();

}
