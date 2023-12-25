package raf.microservice.components.userservice.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import raf.microservice.components.userservice.dto.*;
import raf.microservice.components.userservice.model.User;

public interface UserService {
    AuthenticationResponseDto add(UserCreateDto userCreateDto);
    AuthenticationResponseDto authenticate(UserLoginDto userLoginDto);
    User findUsername(String username);
    SessionTokenDto refreshToken(String authorization);
}
