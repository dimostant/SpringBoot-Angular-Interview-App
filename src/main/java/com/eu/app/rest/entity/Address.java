package com.eu.app.rest.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "address")

public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String workAddress;
    private String homeAddress;

    @OneToOne(mappedBy = "address")
    private User user;
}
