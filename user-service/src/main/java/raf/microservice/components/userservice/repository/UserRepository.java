package raf.microservice.components.userservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import raf.microservice.components.userservice.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findUserByUsernameAndPassword(String username, String password);
}
