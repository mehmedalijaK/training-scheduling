package raf.microservice.scheduletraining.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import raf.microservice.scheduletraining.domain.Gym;

import java.util.Optional;


public interface GymRepository extends JpaRepository<Gym, Long> {


    Gym findByGymName(String gymName);
}
