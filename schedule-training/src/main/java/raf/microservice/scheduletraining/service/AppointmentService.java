package raf.microservice.scheduletraining.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import raf.microservice.scheduletraining.domain.Sport;
import raf.microservice.scheduletraining.dto.AppointmentDto;
import raf.microservice.scheduletraining.dto.FreeAppointmentDto;

import java.time.DayOfWeek;
import java.util.List;

@Service
public interface AppointmentService {
    AppointmentDto add(AppointmentDto apDTO, String aut);
    AppointmentDto addWithSport(AppointmentDto apDTO, String aut);
    AppointmentDto updateById(Long apId, AppointmentDto apDTO);
    AppointmentDto findById(Long apId);
    List<AppointmentDto> findAllReserved();
    List<FreeAppointmentDto> findAllFree();
    List<FreeAppointmentDto> filterByType(boolean individual);
    List<FreeAppointmentDto> filterByDay(String day);
    List<FreeAppointmentDto> sortByTime();
    void cancelForManager(Long id, String aut);
    void deleteById(Long apId, String aut);
    List<AppointmentDto> findAllForClientId(Long id);


}
