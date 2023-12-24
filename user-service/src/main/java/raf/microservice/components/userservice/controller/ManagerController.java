package raf.microservice.components.userservice.controller;

import io.swagger.annotations.ApiOperation;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import raf.microservice.components.userservice.dto.ManagerCreateDto;
import raf.microservice.components.userservice.dto.ManagerDto;
import raf.microservice.components.userservice.security.CheckExists;
import raf.microservice.components.userservice.service.ManagerService;

@RestController
@RequestMapping("/manager")
public class ManagerController {

    private ManagerService managerService;

    public ManagerController(ManagerService managerService){this.managerService = managerService;}

    @ApiOperation(value = "Register new manager")
    @PostMapping
    @CheckExists
    public ResponseEntity<ManagerDto> saveManager(@RequestBody @Valid ManagerCreateDto managerCreateDto){
        System.out.println(managerCreateDto.toString());
        return new ResponseEntity<>(managerService.add(managerCreateDto), HttpStatus.CREATED);
    }

}
