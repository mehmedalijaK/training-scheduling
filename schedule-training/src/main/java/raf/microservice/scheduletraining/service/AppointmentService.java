package raf.microservice.scheduletraining.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import raf.microservice.scheduletraining.dto.AppointmentDto;
import raf.microservice.scheduletraining.dto.FreeAppointmentDto;

import java.time.DayOfWeek;
import java.util.List;

@Service
public interface AppointmentService {
    AppointmentDto add(AppointmentDto apDTO, String aut);
    AppointmentDto updateById(Long apId, AppointmentDto apDTO);
    AppointmentDto findById(Long apId);
    List<AppointmentDto> findAllReserved();
    List<FreeAppointmentDto> findAllFree();
    List<AppointmentDto> filterByType(boolean individual);
    List<AppointmentDto> filterByDay(String day);
    List<AppointmentDto> sortByTime();
    void cancelForManager(Long id, String aut);
    void deleteById(Long apId, String aut);
}
