package com.eu.app.rest.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "addresses")

public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String workAddress;
    private String homeAddress;

    @OneToOne
    @JoinColumn(name = "user_id") // This will create a foreign key reference to the user
    private User user;
}
