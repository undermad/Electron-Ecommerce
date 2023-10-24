package com.electron.rest.repository;

import com.electron.rest.entity.Role;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface RoleRepository extends CrudRepository<Role, Long> {



    @Query(value = "select role_id, role_name from users_roles inner join users on users_roles.user_id = :id join roles on role_id = roles.id", nativeQuery = true)
    List<Object[]> getRolesByUserId(@Param("id") Long id);

}
