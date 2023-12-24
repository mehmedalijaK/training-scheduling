package raf.microservice.scheduletraining.domain;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import org.springframework.format.annotation.NumberFormat;

public class GymSport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Sport sport;
    @ManyToOne
    private Gym gym;
    @NumberFormat
    private int price;
}
