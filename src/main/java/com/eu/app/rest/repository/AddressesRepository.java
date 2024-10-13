package com.eu.app.rest.repository;

import com.eu.app.rest.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressesRepository extends JpaRepository<Address, Long> {
}
