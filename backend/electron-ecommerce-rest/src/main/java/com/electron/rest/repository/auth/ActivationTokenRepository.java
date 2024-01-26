package com.electron.rest.repository.auth;

import com.electron.rest.entity.user.ActivationToken;
import com.electron.rest.entity.projections.ActivationTokenProjection;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;


public interface ActivationTokenRepository extends CrudRepository<ActivationToken, Long> {

    @Query(value = "SELECT t.id FROM activation_tokens t WHERE t.token = :token", nativeQuery = true)
    Optional<ActivationTokenProjection> findActivationTokenIdByToken(@Param("token") String token);

    @Query(value = "SELECT t.user_id as userId FROM activation_tokens t WHERE t.id = :tokenId", nativeQuery = true)
    Optional<ActivationTokenProjection> findUserIdByActivationTokenId(@Param("tokenId") Long tokenId);

    @Modifying
    @Query(value = "DELETE FROM activation_tokens t WHERE t.id = :activationTokenId", nativeQuery = true)
    void deleteActivationTokenById(@Param("activationTokenId") Long activationTokenId);
}
