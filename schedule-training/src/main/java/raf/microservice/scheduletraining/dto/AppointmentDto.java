package raf.microservice.scheduletraining.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import raf.microservice.scheduletraining.security.Divides24;

import java.time.LocalDateTime;
@Data
public class AppointmentDto {
    @NotNull
    private LocalDateTime scheduledTime;
    private String sportName;
    private boolean individual;
    private String gymName;
    private String shortDescription;
    @Positive
    private int numberOfCoaches;
    @Divides24
    private int trainingDuration;
}
