package raf.microservice.components.notificationservice.security.services;
import org.springframework.security.core.userdetails.UserDetails;

public interface JwtService {
    boolean isTokenValid(String token);
}
