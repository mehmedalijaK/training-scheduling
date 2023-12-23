package raf.microservice.components.userservice.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "admins")
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "email")
    private String email;

    @Column(name = "date_birth")
    private LocalDate dateBirth;

    @Column(name = "name")
    private LocalDate name;

    @Column(name = "last_name")
    private LocalDate lastName;

    @ManyToOne(optional = false)
    private Role role;

    public Admin(long id, String username, String password, String email, LocalDate dateBirth, LocalDate name, LocalDate lastName,
    Role role) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.dateBirth = dateBirth;
        this.name = name;
        this.lastName = lastName;
        this.role = role;
    }

    public long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    public LocalDate getDateBirth() {
        return dateBirth;
    }

    public LocalDate getName() {
        return name;
    }

    public LocalDate getLastName() {
        return lastName;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setDateBirth(LocalDate dateBirth) {
        this.dateBirth = dateBirth;
    }

    public void setName(LocalDate name) {
        this.name = name;
    }

    public void setLastName(LocalDate lastName) {
        this.lastName = lastName;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "Admin{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", dateBirth=" + dateBirth +
                ", name=" + name +
                ", lastName=" + lastName +
                '}';
    }
}
