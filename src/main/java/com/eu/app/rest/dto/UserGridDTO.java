package com.eu.app.rest.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserGridDTO {
    private Long id;
    private String name;
    private String surname;
}
