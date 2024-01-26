package com.electron.rest.repository.auth;

import com.electron.rest.entity.user.AccountStatus;
import com.electron.rest.entity.projections.AccountStatusProjection;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;


public interface AccountStatusRepository extends CrudRepository<AccountStatus, Long> {

    Optional<AccountStatus> findAccountStatusByStatusType(String statusType);

    @Query(value = "SELECT acc.id FROM account_statuses acc WHERE acc.status_type = :statusType", nativeQuery = true)
    Optional<AccountStatusProjection> findAccountStatusIdByStatusType(@Param("statusType") String statusType);

}
