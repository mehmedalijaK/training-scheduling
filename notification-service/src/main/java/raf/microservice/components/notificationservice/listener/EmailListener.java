package raf.microservice.components.notificationservice.listener;

import jakarta.jms.JMSException;
import jakarta.jms.Message;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Component;
import raf.microservice.components.notificationservice.dto.TransferDto;
import raf.microservice.components.notificationservice.listener.helper.MessageHelper;
import raf.microservice.components.notificationservice.service.EmailService;

@Component
public class EmailListener {

    private MessageHelper messageHelper;
    private EmailService emailService;

    public EmailListener(MessageHelper messageHelper, EmailService emailService){
        this.emailService = emailService;
        this.messageHelper = messageHelper;
    }

    @JmsListener(destination = "${destination.sendEmails}", concurrency = "5-10")
    public void sendMail(Message message) throws JMSException{
        TransferDto transferDto = messageHelper.getMessage(message, TransferDto.class);
        System.out.println(transferDto.toString());
    }


}


