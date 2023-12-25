package raf.microservice.components.userservice.mapper;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import raf.microservice.components.userservice.dto.UserCreateDto;
import raf.microservice.components.userservice.dto.UserDto;
import raf.microservice.components.userservice.model.User;
import raf.microservice.components.userservice.repository.RoleRepository;

@Component
public class UserMapper {
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;

    public UserMapper(RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }
    public User userCreateDtoToUser(UserCreateDto userCreateDto){
        ModelMapper modelMapper = new ModelMapper();
        TypeMap<UserCreateDto, User> propertyMapper = modelMapper.createTypeMap(UserCreateDto.class, User.class);
        propertyMapper.addMapping(UserCreateDto::getUsername, User::setUsername);
        propertyMapper.addMapping(UserCreateDto::getPassword, User::setPassword);
        propertyMapper.addMapping(UserCreateDto::getEmail, User::setEmail);
        propertyMapper.addMapping(UserCreateDto::getDateBirth, User::setDateBirth);
        propertyMapper.addMapping(UserCreateDto::getName, User::setName);
        propertyMapper.addMapping(UserCreateDto::getLastName, User::setLastName);

        User user = modelMapper.map(userCreateDto, User.class);
        user.setRole(roleRepository.findRoleByName("ROLE_USER").get());
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return user;
    }

    public UserDto userToUserDto(User user) {

        return null;
    }
}
