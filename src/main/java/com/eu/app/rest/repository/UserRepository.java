package com.eu.app.rest.repository;

import com.eu.app.rest.dto.UserDTO;
import com.eu.app.rest.dto.UserGridDTO;
import com.eu.app.rest.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT new com.eu.app.rest.dto.UserGridDTO(u.id, u.name, u.surname) FROM User u")
    Page<UserGridDTO> findAllUsersWithLimitedFields(Pageable pageable);

    @Query("SELECT new com.eu.app.rest.dto.UserDTO(u.id, u.name, u.surname, u.gender, u.birthDate, u.address.workAddress, u.address.homeAddress ) FROM User u WHERE u.id = :id")
    UserDTO getUserById(Long id);

}