package raf.microservice.scheduletraining.controller;

import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import raf.microservice.scheduletraining.dto.GymDto;
import raf.microservice.scheduletraining.security.CheckSecurity;
import raf.microservice.scheduletraining.service.GymService;

@RestController
@RequestMapping("/gyms")
public class GymController {

    private GymService gymService;

    public GymController(GymService gymService) {
        this.gymService = gymService;
    }

    @GetMapping
    public ResponseEntity<Page<GymDto>> findAll(@RequestHeader("Authorization") String authorization, Pageable pageable) {
        return new ResponseEntity<>(gymService.findAll(pageable), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @CheckSecurity(roles = {"ROLE_USER", "ROLE_ADMIN"})
    public ResponseEntity<GymDto> findById(@RequestHeader("Authorization") String authorization, @PathVariable("id") Long id) {
        return new ResponseEntity<>(gymService.findById(id), HttpStatus.OK);
    }

    @PostMapping
    @CheckSecurity(roles = {"ROLE_ADMIN"})
    public ResponseEntity<GymDto> add(@RequestHeader("Authorization") String authorization, @RequestBody @Valid GymDto movieCreateDto) {
        return new ResponseEntity<>(gymService.add(movieCreateDto), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    @CheckSecurity(roles = {"ROLE_ADMIN"})
    public ResponseEntity<?> delete(@RequestHeader("Authorization") String authorization, @PathVariable("id") Long id) {
        gymService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
