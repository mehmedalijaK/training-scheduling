package raf.microservice.components.notificationservice.mapper;

import org.springframework.stereotype.Component;
import raf.microservice.components.notificationservice.dto.NotificationDto;
import raf.microservice.components.notificationservice.model.Notification;
import raf.microservice.components.notificationservice.repository.TypeRepository;

@Component
public class NotificationMapper {

    public NotificationMapper(){

    }

    public NotificationDto notificationToNotificationDto(Notification notification){
        NotificationDto notificationDto = new NotificationDto();
        notificationDto.setTypeName(notification.getType().getName());
        notificationDto.setMessage(notification.getMessage());
        notificationDto.setMailReceiver(notification.getMailReceiver());
        return notificationDto;
    }


}
