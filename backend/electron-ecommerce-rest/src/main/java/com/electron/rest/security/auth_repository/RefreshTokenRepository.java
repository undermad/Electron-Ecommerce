package com.electron.rest.security.auth_repository;

import com.electron.rest.security.auth_entity.RefreshToken;
import com.electron.rest.security.auth_repository.projections.RefreshTokenProjection;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RefreshTokenRepository extends CrudRepository<RefreshToken, Long> {


    @Query(value = "SELECT expiry_date AS expirationDate, token AS token, id AS id FROM refresh_tokens t WHERE token = :token", nativeQuery = true)
    List<RefreshTokenProjection> findRefreshTokenByToken(@Param("token") String token);

    @Modifying
    @Query(value = "DELETE FROM refresh_tokens WHERE user_id = :userId", nativeQuery = true)
    void deleteTokenByUserId(@Param("userId") Long userId);
}
