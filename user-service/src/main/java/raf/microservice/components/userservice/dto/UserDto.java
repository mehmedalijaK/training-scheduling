package raf.microservice.components.userservice.dto;

import java.time.LocalDate;

public class UserDto {

    private String username;
    private String email;
    private LocalDate dateBirth;
    private String name;
    private String lastName;
    private String membershipCardId;
    private String scheduledTrainingCount;

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
        return dateBirth;
    }

    public void setDateBirth(LocalDate dateBrith) {
        this.dateBirth = dateBrith;
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

    public String getMembershipCardId() {
        return membershipCardId;
    }

    public void setMembershipCardId(String membershipCardId) {
        this.membershipCardId = membershipCardId;
    }

    public String getScheduledTrainingCount() {
        return scheduledTrainingCount;
    }

    public void setScheduledTrainingCount(String scheduledTrainingCount) {
        this.scheduledTrainingCount = scheduledTrainingCount;
    }
}
