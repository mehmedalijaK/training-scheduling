package raf.microservice.components.userservice.service.impl;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import raf.microservice.components.userservice.model.Admin;
import raf.microservice.components.userservice.model.Manager;
import raf.microservice.components.userservice.model.Role;
import raf.microservice.components.userservice.model.User;
import raf.microservice.components.userservice.repository.AdminRepository;
import raf.microservice.components.userservice.repository.ManagerRepository;
import raf.microservice.components.userservice.repository.UserRepository;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    private final ManagerRepository managerRepository;
    private final AdminRepository adminRepository;
    public String userType = "USER";

    public CustomUserDetailsService(UserRepository userRepository, ManagerRepository managerRepository,
                                    AdminRepository adminRepository) {
        this.userRepository = userRepository;
        this.managerRepository = managerRepository;
        this.adminRepository = adminRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserDetails userDetails;

        switch (userType) {
            case "MANAGER" -> {
                Optional<Manager> manager = managerRepository.findManagerByUsername(username);
                userDetails = manager.orElseThrow(() -> new UsernameNotFoundException("Manager not found"));
                if(userDetails.getAuthorities().toArray()[0].toString().equals("ROLE_BANNED"))
                    return null; // TODO: exception throw
            }
            case "USER" -> {
                Optional<User> user = userRepository.findUserByUsername(username);
                userDetails = user.orElseThrow(() -> new UsernameNotFoundException("User not found"));
                if(userDetails.getAuthorities().toArray()[0].toString().equals("ROLE_BANNED"))
                    return null; // TODO: exception throw
            }
            case "ADMIN" -> {
                Optional<Admin> admin = adminRepository.findAdminByUsername(username);
                userDetails = admin.orElseThrow(() -> new UsernameNotFoundException("User not found"));
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
