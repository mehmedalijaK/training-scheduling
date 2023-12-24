package raf.microservice.components.userservice.service;

public interface JwtService {
    String extractUsername(String jwt);
}
