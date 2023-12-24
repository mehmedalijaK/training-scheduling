package raf.microservice.components.userservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import raf.microservice.components.userservice.model.Manager;
import raf.microservice.components.userservice.model.User;

import java.util.Optional;

public interface ManagerRepository extends JpaRepository<Manager, Long> {
    Optional<User> findManagerByUsernameAndPassword(String username, String password);
}
