package com.electron.rest.repository;

import com.electron.rest.entity.User;
import com.electron.rest.repository.projections.UserProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface UserRepository extends JpaRepository<User, Long> {

    @Query(value = "SELECT u.id as id, u.email as email, u.password as password from users u where email = :email", nativeQuery = true)
    List<UserProjection> getUserEmailAndPassword(@Param("email") String email);

}
