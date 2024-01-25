package com.electron.rest.repository;

import com.electron.rest.entity.user.RefreshToken;
import com.electron.rest.entity.projections.RefreshTokenProjection;
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
    void deleteRefreshTokenByUserId(@Param("userId") Long userId);

    @Modifying
    @Query(value = "DELETE FROM refresh_tokens WHERE token = :token", nativeQuery = true)
    void deleteRefreshTokenByToken(@Param("token") String token);


}
