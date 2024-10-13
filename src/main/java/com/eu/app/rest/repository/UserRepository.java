package com.eu.app.rest.repository;

import com.eu.app.rest.dto.UserDTO;
import com.eu.app.rest.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT new com.eu.app.rest.dto.UserDTO(u.id, u.name, u.surname) FROM User u")
    Page<UserDTO> findAllUsersWithLimitedFields(Pageable pageable);

}