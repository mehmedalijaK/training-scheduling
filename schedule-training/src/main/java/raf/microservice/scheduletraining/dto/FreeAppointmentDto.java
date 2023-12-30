package raf.microservice.scheduletraining.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class FreeAppointmentDto {
    private LocalDateTime scheduledTime;
    private String name;
    private String shortDescription;
    private int trainingDuration;
    private int numberOfCoaches;
}
