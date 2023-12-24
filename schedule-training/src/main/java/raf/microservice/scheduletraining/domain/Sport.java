package raf.microservice.scheduletraining.domain;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name="typeOfTraining")
public class Sport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String type;
    private boolean individual;

    public Sport(String type, boolean individual) {
        this.type = type;
        this.individual = individual;
    }
}
