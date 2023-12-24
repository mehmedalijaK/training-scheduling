package raf.microservice.components.userservice.service.impl;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import raf.microservice.components.userservice.dto.UserCreateDto;
import raf.microservice.components.userservice.dto.UserDto;
import raf.microservice.components.userservice.mapper.UserMapper;
import raf.microservice.components.userservice.model.User;
import raf.microservice.components.userservice.repository.UserRepository;
import raf.microservice.components.userservice.service.UserService;

import java.util.Optional;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private UserMapper userMapper;

    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper){
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @Override
    public UserDto add(UserCreateDto userCreateDto) {
        User user = userMapper.userCreateDtoToUser(userCreateDto);
        userRepository.save(user);
        return userMapper.userToUserDto(user);
    }

    @Override
    public User findUsername(String username) {
        return userRepository.findUserByUsername(username).orElse(null);
    }
}
