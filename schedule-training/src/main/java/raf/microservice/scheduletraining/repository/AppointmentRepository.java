package raf.microservice.scheduletraining.repository;

import jakarta.validation.constraints.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import raf.microservice.scheduletraining.domain.Appointment;
import raf.microservice.scheduletraining.domain.Gym;
import raf.microservice.scheduletraining.dto.AppointmentDto;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    List<Appointment> findAppointmentsByScheduledTimeAfter(@NotNull LocalDateTime scheduledTime);
    @Query("SELECT a FROM Appointment a WHERE a.training.gym = :gym AND a.scheduledTime = :scheduledTime")
    Appointment findAppointmentByTimeAndGym(LocalDateTime scheduledTime, Gym gym);

    @Query("SELECT a FROM Appointment a WHERE a.training.sport.individual = :individual")
    List<Appointment> findAppointmentByType(boolean individual);
    @Query("SELECT a FROM Appointment a WHERE TO_CHAR(a.scheduledTime,'dy') = :day")
    List<Appointment> findAppointmentsByDay( String day);
    @Query("SELECT COUNT(a.clientId) FROM Appointment a WHERE a.training.gym = :gym AND a.scheduledTime = :scheduledTime")
    int findAppointmentsByGroupTraining(LocalDateTime scheduledTime, Gym gym);
    @Query("SELECT COUNT(a) FROM Appointment a WHERE a.clientId = :id")
    int countClientDiscount(Long id);
    @Query("SELECT a FROM Appointment a WHERE a.clientId = :clientId")
    List<Appointment> findAllReservedForUser(Long clientId);

    List<Appointment> findAllByOrderByScheduledTimeAsc();
    @Query("SELECT a FROM Appointment a WHERE a.training.gym.manager_id= :managerId")
    List<Appointment> findAllReservedForManager(Long managerId);

}
