package raf.microservice.scheduletraining.mapper;

import raf.microservice.scheduletraining.domain.Sport;
import raf.microservice.scheduletraining.dto.SportDto;
import raf.microservice.scheduletraining.repository.GymRepository;
import raf.microservice.scheduletraining.repository.SportRepository;

public class SportMapper {

    private SportRepository sportRepository;
    private GymRepository gymRepository;

    public SportDto sportToSportDto(Sport sport){
        return null ;
    }
}
