package raf.microservice.components.userservice.service.impl;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import raf.microservice.components.userservice.model.Manager;
import raf.microservice.components.userservice.model.User;
import raf.microservice.components.userservice.repository.ManagerRepository;
import raf.microservice.components.userservice.repository.UserRepository;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    private final ManagerRepository managerRepository;
    public String userType = "USER";

    public CustomUserDetailsService(UserRepository userRepository, ManagerRepository managerRepository) {
        this.userRepository = userRepository;
        this.managerRepository = managerRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserDetails userDetails;

        switch (userType) {
            case "MANAGER" -> {
                Optional<Manager> manager = managerRepository.findManagerByUsername(username);
                userDetails = manager.orElseThrow(() -> new UsernameNotFoundException("Manager not found"));
            }
            case "USER" -> {
                Optional<User> user = userRepository.findUserByUsername(username);
                userDetails = user.orElseThrow(() -> new UsernameNotFoundException("User not found"));
            }
            default -> throw new UsernameNotFoundException("No user");
        }

        return userDetails;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }
}
