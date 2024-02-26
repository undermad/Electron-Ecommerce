package com.electron.rest.repository.order;

import com.electron.rest.entity.orders.DeliveryAddress;
import com.electron.rest.entity.projections.DeliveryAddressProjection;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface DeliveryAddressRepository extends CrudRepository<DeliveryAddress, Long> {


    @Query(value = """
                SELECT da.full_name as fullName,
                da.street_one as streetOne,
                da.street_two as streetTwo,
                da.city as city,
                da.state as state,
                da.postcode as postcode
                FROM delivery_addresses da
                WHERE da.id = :deliveryAddressId
            """, nativeQuery = true)
    Optional<DeliveryAddressProjection> getDeliveryAddress(@Param("deliveryAddressId") Long deliveryAddressId);
}
