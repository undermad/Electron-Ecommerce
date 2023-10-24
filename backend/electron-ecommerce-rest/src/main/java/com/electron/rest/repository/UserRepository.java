package com.electron.rest.repository;

import com.electron.rest.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {

    @Query(value = "SELECT id, email, password from users where email = :email", nativeQuery = true)
    Object[] getUserEmailAndPassword(@Param("email") String email);


    Optional<User> getUserByEmail(String email);

}
