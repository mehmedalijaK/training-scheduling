package raf.microservice.scheduletraining.controller;

import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import raf.microservice.scheduletraining.dto.AppointmentDto;
import raf.microservice.scheduletraining.dto.GymDto;
import raf.microservice.scheduletraining.security.CheckSecurity;
import raf.microservice.scheduletraining.service.GymService;

import java.util.List;

@RestController
@RequestMapping("/gyms")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
public class GymController {

    private GymService gymService;

    public GymController(GymService gymService) {
        this.gymService = gymService;
    }

    @GetMapping
    @CheckSecurity
    public ResponseEntity<List<GymDto>> findAll(@RequestHeader("Authorization") String authorization, Pageable pageable) {
        return new ResponseEntity<>(gymService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @CheckSecurity
    public ResponseEntity<GymDto> findById(@RequestHeader("Authorization") String authorization, @PathVariable("id") Long id) {
        return new ResponseEntity<>(gymService.findById(id), HttpStatus.OK);
    }

    @PostMapping
    @CheckSecurity(roles = {"ROLE_MANAGER"})
    public ResponseEntity<GymDto> add(@RequestHeader("Authorization") String authorization, @RequestBody @Valid GymDto gymDto) {
        return new ResponseEntity<>(gymService.add(gymDto), HttpStatus.CREATED);
    }
    @PostMapping("/{id}")
    @CheckSecurity(roles = {"ROLE_ADMIN", "ROLE_MANAGER"})
    public ResponseEntity<GymDto> updateById(@RequestHeader("Authorization") String authorization, @RequestBody @Valid GymDto gymDto,  @PathVariable String id) {
        return new ResponseEntity<>(gymService.updateById(Long.valueOf(id),gymDto), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    @CheckSecurity(roles = {"ROLE_ADMIN"})
    public ResponseEntity<?> delete(@RequestHeader("Authorization") String authorization, @PathVariable("id") Long id) {
        gymService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
