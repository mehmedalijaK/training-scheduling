package raf.microservice.components.userservice.dto;

import java.time.LocalDate;

public class AdminDto {

    private Long id;
    private String username;
    private String email;
    private LocalDate dateBrith;
    private String name;
    private String lastName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getDateBrith() {
        return dateBrith;
    }

    public void setDateBrith(LocalDate dateBrith) {
        this.dateBrith = dateBrith;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}
