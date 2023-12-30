package raf.microservice.scheduletraining.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import raf.microservice.scheduletraining.dto.GymDto;
import raf.microservice.scheduletraining.dto.TrainingDto;

public interface TrainingService {
    TrainingDto add(GymDto trainingDTO);
    TrainingDto findById(Long Id);
    Page<TrainingDto> findAll(Pageable pageable);
}
