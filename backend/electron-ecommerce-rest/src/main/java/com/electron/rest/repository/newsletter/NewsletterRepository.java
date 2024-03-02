package com.electron.rest.repository.newsletter;

import com.electron.rest.entity.projections.SubscriptionEmailProjection;
import com.electron.rest.entity.user.SubscriptionEmail;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface NewsletterRepository extends CrudRepository<SubscriptionEmail, Long> {

    @Query(value = "SELECT se.email as email FROM subscription_email se WHERE se.email = :email", nativeQuery = true)
    Optional<SubscriptionEmailProjection> getEmail(@Param("email") String email);
}
