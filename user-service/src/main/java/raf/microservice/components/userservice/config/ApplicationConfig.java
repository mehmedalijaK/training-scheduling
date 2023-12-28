package raf.microservice.components.userservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import raf.microservice.components.userservice.repository.ManagerRepository;
import raf.microservice.components.userservice.repository.UserRepository;
import raf.microservice.components.userservice.service.impl.CustomUserDetailsService;

@Configuration
public class ApplicationConfig {

    private UserRepository userRepository;
    private ManagerRepository managerRepository;
    private CustomUserDetailsService customUserDetailsService;

    public ApplicationConfig(UserRepository userRepository, ManagerRepository managerRepository, CustomUserDetailsService customUserDetailsService){
        this.userRepository = userRepository;
        this.managerRepository = managerRepository;
        this.customUserDetailsService = customUserDetailsService;
    }

//    @Bean
//    public UserDetailsService userDetailsService() {
//        Optional<Manager> manager = managerRepository.findManagerByUsername(username);
//        if (manager.isPresent()) {
//            return (UserDetailsService) manager.get();
//        } else {
//            throw new UsernameNotFoundException("Manager not found");
//        }
//    }

    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(customUserDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
