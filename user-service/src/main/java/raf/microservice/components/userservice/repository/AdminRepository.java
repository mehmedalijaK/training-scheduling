package raf.microservice.components.userservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import raf.microservice.components.userservice.model.Admin;
import raf.microservice.components.userservice.model.User;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<User> findAdminByUsernameAndPassword(String username, String password);
}
