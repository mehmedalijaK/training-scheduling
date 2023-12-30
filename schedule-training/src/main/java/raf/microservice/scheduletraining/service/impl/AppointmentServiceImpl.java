package raf.microservice.scheduletraining.service.impl;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import raf.microservice.scheduletraining.domain.Appointment;
import raf.microservice.scheduletraining.domain.Gym;
import raf.microservice.scheduletraining.dto.AppointmentDto;
import raf.microservice.scheduletraining.dto.FreeAppointmentDto;
import raf.microservice.scheduletraining.mapper.AppointmentMapper;
import raf.microservice.scheduletraining.mapper.GymMapper;
import raf.microservice.scheduletraining.repository.AppointmentRepository;
import raf.microservice.scheduletraining.repository.GymRepository;
import raf.microservice.scheduletraining.service.AppointmentService;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Service
public class AppointmentServiceImpl implements AppointmentService {

    AppointmentRepository appointmentRepository;
    AppointmentMapper appointmentMapper;
    GymRepository gymRepository;

    @Override
    public AppointmentDto add(AppointmentDto apDTO) {
        Appointment appointment = appointmentMapper.appointmentDtoToAppointment(apDTO);
        if(appointment.getScheduledTime().isAfter(LocalDateTime.now().plusWeeks(2)))
            return null; //todo: vrati nesto drugo
        appointmentRepository.save(appointment);
        return appointmentMapper.appointmentToAppointmentDto(appointment);
    }

    @Override
    public AppointmentDto updateById(Long apId, AppointmentDto apDTO) {
        Appointment appointment = appointmentRepository.findById(apId).orElseThrow(() ->
                new RuntimeException(String.format
                        ("Appointment with id: %d does not exists.", apId)));
        appointment = appointmentMapper.updateAppo(appointment,apDTO);
        appointmentRepository.save(appointment);
        return appointmentMapper.appointmentToAppointmentDto(appointment);
    }

    @Override
    public AppointmentDto findById(Long apId) {
        return appointmentRepository.findById(apId)
                .map(appointmentMapper::appointmentToAppointmentDto)
                .orElseThrow(() ->
                        new RuntimeException(String.format
                                ("Gym with id: %d does not exists.", apId)));
    }

    @Override
    public List<AppointmentDto> findAllReserved() {
        LocalDateTime ldt = LocalDateTime.now().withMinute(0).withSecond(0).withNano(0);
        List<Appointment> apps = appointmentRepository.findAppointmentsByScheduledTimeAfter(ldt);
        List<AppointmentDto> dtList = new ArrayList<>();
        for(Appointment a: apps){
            System.out.println(a);
            if(!ldt.plusDays(1).isBefore(a.getScheduledTime()) &&
                    !a.getTraining().getSport().isIndividual() &&
                    appointmentRepository.findAppointmentsByGroupTraining(a.getScheduledTime(),a.getTraining().getGym())<3)
                a.setCanceled(true);
            if(a.isCanceled())
                continue;
            dtList.add(appointmentMapper.appointmentToAppointmentDto(a));
        }

        return dtList;
    }

    @Override
    public List<FreeAppointmentDto> findAllFree() {
        LocalDateTime ldt = LocalDateTime.now().withMinute(0).withSecond(0).withNano(0);
        LocalDateTime now = ldt;
        LocalDateTime end = ldt.plusWeeks(2);
        List<FreeAppointmentDto> free = new ArrayList<>();
        List<Gym> allGyms = gymRepository.findAll();
        for(Gym gym: allGyms){
            while(ldt.isBefore(end)){
                int duration = gym.getTrainingDuration();
                int h = ldt.getHour() - ldt.getHour()%duration;
                ldt = ldt.withHour(h);
                for(int i = 0; i< 24 ; i+=duration){
                    Appointment tmp;
                    ldt = ldt.plusHours(duration);
                    if((tmp = appointmentRepository.findAppointmentByTimeAndGym(ldt, gym)) != null){
                        if(tmp.getTraining().getSport().isIndividual())
                            continue;
                        if(appointmentRepository.findAppointmentsByGroupTraining(ldt,gym) == 12)
                            continue;
                        if(!now.plusDays(1).isBefore(tmp.getScheduledTime()) &&
                                !tmp.getTraining().getSport().isIndividual() &&
                                appointmentRepository.findAppointmentsByGroupTraining(tmp.getScheduledTime(),tmp.getTraining().getGym())<3)
                            tmp.setCanceled(true);
                        if(tmp.isCanceled())
                            continue;
                    }
                    FreeAppointmentDto dto = appointmentMapper.makeAppointmentDto(gym, ldt);
                    free.add(dto);
                }

            }
            ldt = now;
        }
        return free;
    }

    @Override
    public List<AppointmentDto> filterByType(boolean individual) {
        List<AppointmentDto> dtList = new ArrayList<>();
        List<Appointment> apps = appointmentRepository.findAppointmentByType(individual);
        for(Appointment a: apps){
            dtList.add(appointmentMapper.appointmentToAppointmentDto(a));
        }
        return dtList;
    }

    @Override
    public List<AppointmentDto> filterByDay(String day) {
        List<AppointmentDto> dtList = new ArrayList<>();
        List<Appointment> apps = appointmentRepository.findAppointmentsByDay(day);
        for(Appointment a: apps){
            dtList.add(appointmentMapper.appointmentToAppointmentDto(a));
        }
        return dtList;
    }

    @Override
    public List<AppointmentDto> sortByTime() {
        List<AppointmentDto> dtList = new ArrayList<>();
        List<Appointment> apps =appointmentRepository.findAllByOrderByScheduledTimeAsc();
        for(Appointment a: apps){
            dtList.add(appointmentMapper.appointmentToAppointmentDto(a));
        }
        return dtList;
    }

    @Override
    public void deleteById(Long apId) {
        appointmentRepository.deleteById(apId);
    }
}
