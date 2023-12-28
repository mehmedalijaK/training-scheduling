package raf.microservice.scheduletraining.mapper;

import org.springframework.stereotype.Component;
import raf.microservice.scheduletraining.domain.Sport;
import raf.microservice.scheduletraining.dto.SportDto;
import raf.microservice.scheduletraining.repository.GymRepository;
import raf.microservice.scheduletraining.repository.SportRepository;

@Component
public class SportMapper {

    public SportDto sportToSportDto(Sport sport){
        SportDto sportDto = new SportDto();
        sportDto.setSportName(sport.getSportName());
        sportDto.setIndividual(sport.isIndividual());
        return sportDto ;
    }

    public Sport SportDtoToSport(SportDto sportDto){
        Sport sport = new Sport();
        sport.setSportName(sportDto.getSportName());
        sport.setIndividual(sportDto.isIndividual());
        return sport;
    }
}
