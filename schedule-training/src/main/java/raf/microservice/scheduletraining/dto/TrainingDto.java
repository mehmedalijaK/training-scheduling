package raf.microservice.scheduletraining.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import raf.microservice.scheduletraining.security.Divides24;

import java.time.LocalDateTime;

public class TrainingDto {

    private String sportName;
    private boolean individual;
    private String gymName;
    private String shortDescription;
    @Divides24
    private int trainingDuration;
    @PositiveOrZero
    private int price;
}
