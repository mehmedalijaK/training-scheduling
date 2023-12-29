package raf.microservice.components.notificationservice.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import raf.microservice.components.notificationservice.dto.NotificationDto;
import raf.microservice.components.notificationservice.service.MailService;

@RestController
@RequestMapping("/mail")
public class MailController {

    private final MailService mailService;

    public MailController(MailService mailService){
        this.mailService = mailService;
    }

    @GetMapping("/all")  //
    public ResponseEntity<Page<NotificationDto>> getAllNotifications(Pageable pageable){
        return new ResponseEntity<>(mailService.findAll(pageable) ,HttpStatus.OK);
    }
}
