package com.eu.app.rest.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "addresses")

public class Addresses {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String workAddress;
    private String homeAddress;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
