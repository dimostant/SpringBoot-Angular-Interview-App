package com.eu.app.rest.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Date;

@Data
@AllArgsConstructor
public class UserDTO {
    private Long id;

    private String name;
    private String surname;
    private String gender;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
    private Date birthDate;

    private String workAddress;
    private String homeAddress;
}
