package com.eu.app.rest.repositories;

import com.eu.app.rest.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}