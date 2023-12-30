package raf.microservice.scheduletraining.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import raf.microservice.scheduletraining.domain.Training;

public interface TrainingRepository extends JpaRepository<Training, Long> {
}
