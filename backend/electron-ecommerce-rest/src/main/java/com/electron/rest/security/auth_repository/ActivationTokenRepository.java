package com.electron.rest.security.auth_repository;

import com.electron.rest.security.auth_entity.ActivationToken;
import com.electron.rest.security.auth_entity.projections.ActivationTokenProjection;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;


public interface ActivationTokenRepository extends CrudRepository<ActivationToken, Long> {

    @Query(value = "SELECT t.id FROM activation_tokens t WHERE t.token = :token", nativeQuery = true)
    Optional<ActivationTokenProjection> findActivationTokenIdByToken(@Param("token") String token);

    @Modifying
    @Query(value = "DELETE FROM activation_tokens t WHERE t.id = :activationTokenId", nativeQuery = true)
    void deleteActivationTokenById(@Param("activationTokenId") Long activationTokenId);
}
