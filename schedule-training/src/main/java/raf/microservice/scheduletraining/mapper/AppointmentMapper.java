package raf.microservice.scheduletraining.mapper;

import jakarta.persistence.Column;
import org.springframework.stereotype.Component;
import raf.microservice.scheduletraining.domain.Appointment;
import raf.microservice.scheduletraining.domain.Gym;
import raf.microservice.scheduletraining.domain.Sport;
import raf.microservice.scheduletraining.domain.Training;
import raf.microservice.scheduletraining.dto.AppointmentDto;
import raf.microservice.scheduletraining.dto.FreeAppointmentDto;

import java.time.LocalDateTime;

@Component
public class AppointmentMapper {
    public AppointmentDto appointmentToAppointmentDto(Appointment appointment) {
        AppointmentDto appointmentDto = new AppointmentDto();
        // gymDto.setId(gym.getId());
        appointmentDto.setClientId(appointment.getClientId());
        appointmentDto.setIndividual(appointment.getTraining().getSport().isIndividual());
        appointmentDto.setPrice(appointment.getTraining().getPrice());
        appointmentDto.setGymName(appointment.getTraining().getGym().getGymName());
        appointmentDto.setScheduledTime(appointment.getScheduledTime());
        appointmentDto.setShortDescription(appointment.getTraining().getGym().getShortDescription());
        appointmentDto.setTrainingDuration(appointment.getTraining().getGym().getTrainingDuration());
        appointmentDto.setSportName(appointment.getTraining().getSport().getSportName());
        return appointmentDto;
    }

    public Appointment appointmentDtoToAppointment(AppointmentDto appointmentDto) {
        Appointment appointment = new Appointment();
        //gym.setId(gymDto.getId());
        appointment.setClientId(appointmentDto.getClientId());
        appointment.setScheduledTime(appointmentDto.getScheduledTime());
        Training training = new Training();
        Sport s = new Sport();
        Gym g = new Gym();
        g.setGymName(appointmentDto.getGymName());
        g.setTrainingDuration(appointmentDto.getTrainingDuration());
        g.setShortDescription(appointmentDto.getShortDescription());
        s.setIndividual(appointmentDto.isIndividual());
        s.setSportName(appointmentDto.getSportName());
        training.setGym(g);
        training.setSport(s);
        training.setPrice(appointmentDto.getPrice());
        appointment.setTraining(training);
        return appointment;
    }

    public Appointment updateAppo(Appointment appointment, AppointmentDto appointmentDto){
       if(appointmentDto.getClientId() > -1)
           appointment.setClientId(appointmentDto.getClientId());
       if(appointmentDto.getScheduledTime() != null)
           appointment.setScheduledTime(appointmentDto.getScheduledTime());
       if(appointmentDto.getSportName() != null)
           appointment.getTraining().getSport().setSportName(appointmentDto.getSportName());
       if(appointmentDto.getPrice()>-1)
           appointment.getTraining().setPrice(appointmentDto.getPrice());
       if(appointmentDto.getShortDescription() != null)
           appointment.getTraining().getGym().setShortDescription(appointmentDto.getShortDescription());
       if(appointmentDto.getTrainingDuration() >0)
           appointment.getTraining().getGym().setTrainingDuration(appointmentDto.getTrainingDuration());
       if(appointmentDto.getGymName() != null)
           appointment.getTraining().getGym().setGymName(appointmentDto.getGymName());

        return appointment;
    }

    public FreeAppointmentDto makeAppointmentDto(Gym gym, LocalDateTime ldt) {
        FreeAppointmentDto dto = new FreeAppointmentDto();
        dto.setScheduledTime(ldt);
        dto.setTrainingDuration(gym.getTrainingDuration());
        dto.setName(gym.getGymName());
        dto.setShortDescription(gym.getShortDescription());
        dto.setNumberOfCoaches(dto.getNumberOfCoaches());
        return dto;
    }
}
