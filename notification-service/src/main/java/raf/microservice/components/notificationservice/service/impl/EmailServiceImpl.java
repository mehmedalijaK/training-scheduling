package raf.microservice.components.notificationservice.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;
import raf.microservice.components.notificationservice.service.EmailService;


@Component
public class EmailServiceImpl implements EmailService {

    @Autowired
    JavaMailSender javaMailSender;

    @Override
    public void sendSimpleMessage(String emailReceiver, String name, String messageToSend) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom("mkarisik2002@gmail.com");
        simpleMailMessage.setTo(emailReceiver);
        simpleMailMessage.setSubject(name);
        simpleMailMessage.setText(messageToSend);
        javaMailSender.send(simpleMailMessage);

    }
}
