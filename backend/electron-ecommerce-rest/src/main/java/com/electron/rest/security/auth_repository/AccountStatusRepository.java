package com.electron.rest.security.auth_repository;

import com.electron.rest.security.auth_entity.AccountStatus;
import org.springframework.data.repository.CrudRepository;


public interface AccountStatusRepository extends CrudRepository<AccountStatus, Long> {

    AccountStatus findAccountStatusByStatusType(String statusType);


//    @Query(value = "SELECT  FROM account_statuses where status_type = 'awaiting activation'")
//    List<AccountStatusProjection> findAwaitingActivationStatus();
}
