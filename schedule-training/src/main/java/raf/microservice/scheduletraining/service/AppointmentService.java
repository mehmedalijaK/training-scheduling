package raf.microservice.scheduletraining.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import raf.microservice.scheduletraining.dto.AppointmentDto;

@Service
public interface AppointmentService {
    AppointmentDto add(AppointmentDto apDTO);
    AppointmentDto updateById(Long apId, AppointmentDto apDTO);
    AppointmentDto findById(Long apId);
    Page<AppointmentDto> findAll(Pageable pageable);
    void deleteById(Long apId);
}
