package com.electron.rest.security.auth_repository;

import com.electron.rest.security.auth_entity.AccountStatus;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;


public interface AccountStatusRepository extends CrudRepository<AccountStatus, Long> {

    Optional<AccountStatus> findAccountStatusByStatusType(String statusType);

}
