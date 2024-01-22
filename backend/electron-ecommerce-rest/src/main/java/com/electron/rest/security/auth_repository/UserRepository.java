package com.electron.rest.security.auth_repository;

import com.electron.rest.security.auth_entity.User;
import com.electron.rest.security.auth_entity.projections.UserProjection;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface UserRepository extends CrudRepository<User, Long> {

    @Query(value = "SELECT u.id AS id, u.email as email, u.password as password from users u where email = :email", nativeQuery = true)
    List<UserProjection> findUserEmailAndPassword(@Param("email") String email);

    @Query(value = "SELECT u.id AS id FROM users u where email = :email", nativeQuery = true)
    Optional<UserProjection> findUserIdFromEmail(@Param("email") String email);

    @Query(value = "SELECT u.id AS id, u.email AS email FROM refresh_tokens INNER JOIN users u ON u.id = user_id WHERE token = :token", nativeQuery = true)
    List<UserProjection> findUserIdAndEmailByRefreshToken(@Param("token") String token);

    @Query(value = "SELECT u.email AS email FROM users u WHERE email = :email", nativeQuery = true)
    List<UserProjection> findUserEmail(@Param("email") String email);

    @Query(value = "SELECT status_type AS accountStatus FROM account_statuses accs RIGHT JOIN users u ON accs.id = u.account_status_id WHERE email = :email", nativeQuery = true)
    List<UserProjection> findUserAccountStatusByEmail(@Param("email") String email);

    @Query(value = "SELECT u.id FROM users u WHERE u.activation_token_id = :activationTokenId", nativeQuery = true)
    Optional<UserProjection> findUserIdByActivationToken(@Param("activationTokenId") Long activationTokenId);

    @Modifying
    @Query(value = "UPDATE users u SET u.account_status_id = :accountStatusId WHERE u.id = :userId", nativeQuery = true)
    void updateAccountStatus(@Param("accountStatusId") Long accountStatusId, @Param("userId") Long userId);




}
