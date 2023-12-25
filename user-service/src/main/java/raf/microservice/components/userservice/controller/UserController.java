package raf.microservice.components.userservice.controller;

import io.swagger.annotations.ApiOperation;
import io.swagger.models.Response;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import raf.microservice.components.userservice.dto.AuthenticationResponseDto;
import raf.microservice.components.userservice.dto.UserCreateDto;
import raf.microservice.components.userservice.dto.UserDto;
import raf.microservice.components.userservice.dto.UserLoginDto;
import raf.microservice.components.userservice.security.CheckExists;
import raf.microservice.components.userservice.service.UserService;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @ApiOperation(value = "Register new user")
    @PostMapping("/register")
    @CheckExists  //  TODO: SHOULD SEND AN EMAIL AND RETURN JUST STATUS CREATED!
    public ResponseEntity<AuthenticationResponseDto> saveUser(@RequestBody @Valid UserCreateDto userCreateDto){
        return new ResponseEntity<>(userService.add(userCreateDto), HttpStatus.CREATED);
    }

    @ApiOperation(value = "Login")
    @PostMapping("/login")  //  TODO: SHOULD SEND AN EMAIL THAT SOMEONE JUST LOGGED IN ACCOUNT
    public ResponseEntity<AuthenticationResponseDto> authenticate(@RequestBody @Valid UserLoginDto userLoginDto){
        return new ResponseEntity<>(userService.authenticate(userLoginDto), HttpStatus.CREATED);
    }

}
