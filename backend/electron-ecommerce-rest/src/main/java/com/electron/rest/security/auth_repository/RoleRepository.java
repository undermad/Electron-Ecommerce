package com.electron.rest.security.auth_repository;

import com.electron.rest.security.auth_entity.Role;
import com.electron.rest.security.auth_repository.projections.RoleProjection;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface RoleRepository extends CrudRepository<Role, Long> {



    @Query(value = "select role_name as roleName from users_roles inner join users on users_roles.user_id = :id join roles on role_id = roles.id", nativeQuery = true)
    List<RoleProjection> getRolesByUserId(@Param("id") Long id);

}
