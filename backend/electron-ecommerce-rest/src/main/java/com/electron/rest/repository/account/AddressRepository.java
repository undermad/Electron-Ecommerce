package com.electron.rest.repository.account;

import com.electron.rest.entity.account.Address;
import com.electron.rest.entity.projections.AddressProjection;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AddressRepository extends CrudRepository<Address, Long> {

    @Query(value = """
             SELECT a.id as id,
             a.street_one as streetOne,
             a.street_two as streetTwo,
             a.city as city,
             a.postcode as postcode,
             a.state as state
             FROM addresses a
             WHERE a.user_id = :userId
            """, nativeQuery = true)
    List<AddressProjection> getAllByUserId(@Param("userId") Long userId);

    @Query(value = "SELECT a.id FROM addresses a WHERE a.id = :addressId", nativeQuery = true)
    Optional<AddressProjection> checkIfExist(@Param("addressId") Long addressId);

    @Modifying
    @Query(value = """
            UPDATE addresses a
            SET a.street_one = :streetOne,
            a.street_two = :streetTwo,
            a.state = :state,
            a.city = :city,
            a.postcode = :postcode
            WHERE a.id = :addressId
            AND a.user_id = :userId
            """, nativeQuery = true)
    void update(@Param("streetOne") String streetOne,
                @Param("streetTwo") String streetTwo,
                @Param("state") String state,
                @Param("city") String city,
                @Param("postcode") String postcode,
                @Param("addressId") Long addressId,
                @Param("userId") Long userId);

    @Query(value = """
            SELECT a.id as id,
            a.street_one as streetOne,
            a.street_two as streetTwo,
            a.state as state,
            a.postcode as postcode,
            a.city as city
            FROM addresses a
            WHERE a.id = :addressId
            AND  a.user_id = :userId
            """, nativeQuery = true)
    Optional<AddressProjection> getAddress(@Param("addressId") Long addressId, @Param("userId") Long userId);


    @Modifying
    @Query(value = "DELETE FROM addresses a WHERE a.id = :addressId AND a.user_id = :userId", nativeQuery = true)
    void deleteAddress(@Param("addressId") Long addressId, @Param("userId") Long userId);
}
