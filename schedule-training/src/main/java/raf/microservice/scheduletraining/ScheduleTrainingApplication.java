package raf.microservice.scheduletraining;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import raf.microservice.scheduletraining.domain.Gym;
import raf.microservice.scheduletraining.domain.Sport;
import raf.microservice.scheduletraining.repository.GymRepository;

@SpringBootApplication
public class ScheduleTrainingApplication implements CommandLineRunner {
	private GymRepository gymRepository;

	public ScheduleTrainingApplication(GymRepository gymRepository) {
		this.gymRepository = gymRepository;
	}

	public static void main(String[] args) {
		SpringApplication.run(ScheduleTrainingApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		Gym gym1 = new Gym();
		gym1.setGymName("gym1");
		gym1.setNumberOfCoaches(2);
		gym1.setShortDescription("desc1");
		Sport tot1 = new Sport("powerlifting",true);
		Sport tot2 = new Sport("pilates",false);
		//gym1.setTypeOfSport(tot1);
		//gym1.setTypeOfSport(tot2);
		gymRepository.save(gym1);
	}
}
