package com.electron.rest.repository.account;

import com.electron.rest.entity.account.Avatar;
import com.electron.rest.entity.projections.AvatarProjection;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface AvatarRepository extends CrudRepository<Avatar, Long> {

    @Query(value = """
            SELECT a.id as id,
            a.file_name as fileName,
            a.file_type as fileType,
            a.file_data as data
            FROM avatar a
            WHERE a.user_id = :userId
            """, nativeQuery = true)
    Optional<AvatarProjection> getUserAvatar(@Param("userId") Long userId);

    @Modifying
    @Query(value = "DELETE FROM avatar a WHERE a.user_id = :userId", nativeQuery = true)
    void deleteAvatar(@Param("userId") Long userId);
}
