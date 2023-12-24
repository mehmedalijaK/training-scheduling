package raf.microservice.scheduletraining.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name="gym")
public class Gym {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String gymName;
    private String shortDescription;
    private int numberOfCoaches;
    private int trainingDuration;//in hours



    public Gym(String gymName, String shortDescription, int numberOfCoaches, int trainingDuration) {
        this.gymName = gymName;
        this.shortDescription = shortDescription;
        this.numberOfCoaches = numberOfCoaches;
        this.trainingDuration = trainingDuration;

    }
}
