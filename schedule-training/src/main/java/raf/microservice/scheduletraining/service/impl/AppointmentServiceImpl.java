package raf.microservice.scheduletraining.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import raf.microservice.scheduletraining.dto.AppointmentDto;
import raf.microservice.scheduletraining.mapper.GymMapper;
import raf.microservice.scheduletraining.repository.GymRepository;
import raf.microservice.scheduletraining.service.AppointmentService;
@AllArgsConstructor
@Service
public class AppointmentServiceImpl implements AppointmentService {


    @Override
    public AppointmentDto add(AppointmentDto apId) {
        return null;
    }

    @Override
    public AppointmentDto updateById(Long gymId, AppointmentDto apId) {
        return null;
    }

    @Override
    public AppointmentDto findById(Long apId) {
        return null;
    }

    @Override
    public Page<AppointmentDto> findAll(Pageable pageable) {
        return null;
    }

    @Override
    public void deleteById(Long apId) {

    }
}
