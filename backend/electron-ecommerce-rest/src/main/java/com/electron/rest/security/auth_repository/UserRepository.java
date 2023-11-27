package com.electron.rest.security.auth_repository;

import com.electron.rest.security.auth_entity.User;
import com.electron.rest.security.auth_repository.projections.UserProjection;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface UserRepository extends CrudRepository<User, Long> {

    @Query(value = "SELECT u.id as id, u.email as email, u.password as password from users u where email = :email", nativeQuery = true)
    List<UserProjection> getUserEmailAndPassword(@Param("email") String email);

    @Query(value = "SELECT u.id AS id FROM users u where email = :email", nativeQuery = true)
    List<UserProjection> getUserIdFromEmail(@Param("email") String email);

    @Query(value = "SELECT u.id AS id, u.email AS email FROM refresh_tokens INNER JOIN users u ON u.id = user_id WHERE token = :token", nativeQuery = true)
    List<UserProjection> getUserByRefreshToken(@Param("token") String token);

}
