package raf.microservice.scheduletraining.service.impl;

import lombok.AllArgsConstructor;
import raf.microservice.scheduletraining.repository.GymRepository;
import raf.microservice.scheduletraining.service.GymService;

@AllArgsConstructor
public class GymServiceImpl implements GymService {
    private GymRepository gymRepository;
}
