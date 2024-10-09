package com.eu.app.rest.entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "user")

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String surname;

    private String gender;

    private String birthDate;

    private String workAddress;

    private String homeAddress;
}
