package raf.microservice.components.userservice.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import raf.microservice.components.userservice.dto.AuthenticationResponseDto;
import raf.microservice.components.userservice.dto.UserCreateDto;
import raf.microservice.components.userservice.dto.UserDto;
import raf.microservice.components.userservice.dto.UserLoginDto;
import raf.microservice.components.userservice.model.User;

public interface UserService {
    AuthenticationResponseDto add(UserCreateDto userCreateDto);
    AuthenticationResponseDto authenticate(UserLoginDto userLoginDto);
    User findUsername(String username);
}
