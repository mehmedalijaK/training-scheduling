package raf.microservice.components.userservice.controller;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.Authorization;
import io.swagger.models.Response;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import raf.microservice.components.userservice.dto.*;
import raf.microservice.components.userservice.security.CheckExists;
import raf.microservice.components.userservice.service.UserService;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @ApiOperation(value = "Register new user")
    @PostMapping("/register")
    @CheckExists  //  TODO: SHOULD SEND AN EMAIL AND RETURN JUST STATUS CREATED!
    public ResponseEntity<AuthenticationResponseDto> saveUser(@RequestBody @Valid UserCreateDto userCreateDto){
        return new ResponseEntity<>(userService.add(userCreateDto), HttpStatus.CREATED);
    }

    @ApiOperation(value = "Login user")
    @PostMapping("/login")  //  TODO: SHOULD SEND AN EMAIL THAT SOMEONE JUST LOGGED IN ACCOUNT
    public ResponseEntity<AuthenticationResponseDto> authenticate(@RequestBody @Valid UserLoginDto userLoginDto){
        return new ResponseEntity<>(userService.authenticate(userLoginDto), HttpStatus.OK);
    }

    @ApiOperation(value = "Refresh token user")
    @PostMapping("/refresh-token")
    public ResponseEntity<SessionTokenDto> refreshToken(@RequestHeader("Authorization") String authorization){
        return new ResponseEntity<>(userService.refreshToken(authorization), HttpStatus.OK);
    }

    @ApiOperation(value = "Get my information")
    @GetMapping("/me")
    public ResponseEntity<UserDto> me(@RequestHeader("Authorization") String authorization){
        return new ResponseEntity<>(userService.getMe(authorization), HttpStatus.OK);
    }

    @ApiOperation(value = "Edit user")
    @PutMapping("/edit")
    public ResponseEntity<UserDto> edit(@RequestHeader("Authorization") String authorization, @RequestBody @Valid UserEditDto userEditDto){
        return new ResponseEntity<>(userService.edit(authorization, userEditDto), HttpStatus.OK);
    }
}
