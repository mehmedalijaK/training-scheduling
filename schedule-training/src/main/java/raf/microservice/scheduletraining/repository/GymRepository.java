package raf.microservice.scheduletraining.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import raf.microservice.scheduletraining.domain.Gym;

public interface GymRepository extends JpaRepository<Gym, Long> {

}
