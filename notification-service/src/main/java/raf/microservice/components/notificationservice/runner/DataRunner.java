package raf.microservice.components.notificationservice.runner;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import raf.microservice.components.notificationservice.model.Type;
import raf.microservice.components.notificationservice.repository.TypeRepository;

@Profile({"default"})
@Component
public class DataRunner implements CommandLineRunner {

    private final TypeRepository typeRepository;

    public DataRunner(TypeRepository typeRepository){
        this.typeRepository = typeRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        Type type = new Type();
        type.setName("REGISTER_USER");
        type.setFormat("Hello %name% %lastname% ! To verify your account please open following link %link%");
        typeRepository.save(type);
    }
}
