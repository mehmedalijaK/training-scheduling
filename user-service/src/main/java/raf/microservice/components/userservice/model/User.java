package raf.microservice.components.userservice.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "users")
public class User {

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

    @Column(name="membership_card_id", unique = true)
    private String membershipCardId;

    @Column(name="scheduled_training_count")
    private Integer scheduledTrainingCount;

    @ManyToOne(optional = false)
    private Role role;

    public User(long id, String username, String password, String email, LocalDate dateBirth, LocalDate name,
                LocalDate lastName, String membershipCardId, Integer scheduledTrainingCount, Role role) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.dateBirth = dateBirth;
        this.name = name;
        this.lastName = lastName;
        this.membershipCardId = membershipCardId;
        this.scheduledTrainingCount = scheduledTrainingCount;
        this.role = role;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getDateBirth() {
        return dateBirth;
    }

    public void setDateBirth(LocalDate dateBirth) {
        this.dateBirth = dateBirth;
    }

    public LocalDate getName() {
        return name;
    }

    public void setName(LocalDate name) {
        this.name = name;
    }

    public LocalDate getLastName() {
        return lastName;
    }

    public void setLastName(LocalDate lastName) {
        this.lastName = lastName;
    }

    public String getMembershipCardId() {
        return membershipCardId;
    }

    public void setMembershipCardId(String membershipCardId) {
        this.membershipCardId = membershipCardId;
    }

    public Integer getScheduledTrainingCount() {
        return scheduledTrainingCount;
    }

    public void setScheduledTrainingCount(Integer scheduledTrainingCount) {
        this.scheduledTrainingCount = scheduledTrainingCount;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
