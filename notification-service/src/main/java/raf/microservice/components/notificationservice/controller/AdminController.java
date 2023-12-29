package raf.microservice.components.notificationservice.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/mail")
public class AdminController {

    @GetMapping("/me")  //
    public ResponseEntity authenticate(){
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
