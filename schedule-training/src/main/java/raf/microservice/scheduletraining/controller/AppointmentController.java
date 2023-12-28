package raf.microservice.scheduletraining.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import raf.microservice.scheduletraining.service.AppointmentService;
import raf.microservice.scheduletraining.service.impl.AppointmentServiceImpl;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    private AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }
}
