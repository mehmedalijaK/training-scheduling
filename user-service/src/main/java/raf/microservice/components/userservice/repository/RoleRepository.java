package raf.microservice.components.userservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import raf.microservice.components.userservice.model.Role;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findRoleByName(String name);
}
