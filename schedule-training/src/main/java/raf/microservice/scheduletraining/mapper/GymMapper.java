package raf.microservice.scheduletraining.mapper;

import org.springframework.stereotype.Component;
import raf.microservice.scheduletraining.domain.Gym;
import raf.microservice.scheduletraining.dto.GymDto;

@Component
public class GymMapper {

    public GymDto gymToGymDto(Gym gym) {
        GymDto gymDto = new GymDto();
       // gymDto.setId(gym.getId()); //todo: jel mi treba id?
        gymDto.setName(gym.getGymName());
        gymDto.setShortDescription(gym.getShortDescription());
        gymDto.setNumberOfCoaches(gym.getNumberOfCoaches());
        gymDto.setTrainingDuration(gym.getTrainingDuration());
        return gymDto;
    }

    public Gym gymDtoToGym(GymDto gymDto) {
        Gym gym = new Gym();
        //gym.setId(gymDto.getId());
        gym.setGymName(gymDto.getName());
        gym.setShortDescription(gymDto.getShortDescription());
        gym.setNumberOfCoaches(gymDto.getNumberOfCoaches());
        gym.setTrainingDuration(gymDto.getTrainingDuration());
        return gym;
    }
}
