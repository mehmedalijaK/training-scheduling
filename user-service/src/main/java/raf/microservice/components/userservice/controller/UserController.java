package raf.microservice.components.userservice.controller;

import io.swagger.annotations.ApiOperation;
import io.swagger.models.Response;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import raf.microservice.components.userservice.dto.UserCreateDto;
import raf.microservice.components.userservice.dto.UserDto;
import raf.microservice.components.userservice.security.CheckExists;
import raf.microservice.components.userservice.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @ApiOperation(value = "Register new user")
    @PostMapping
    @CheckExists
    public ResponseEntity<UserDto> saveUser(@RequestHeader("Authorization") @RequestBody @Valid UserCreateDto userCreateDto){
        System.out.println(userCreateDto.toString());
        return new ResponseEntity<>(userService.add(userCreateDto), HttpStatus.CREATED);
    }

}
