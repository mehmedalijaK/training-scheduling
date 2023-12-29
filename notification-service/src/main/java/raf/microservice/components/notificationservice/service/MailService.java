package raf.microservice.components.notificationservice.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import raf.microservice.components.notificationservice.dto.NotificationDto;

public interface MailService {
    Page<NotificationDto> findAll(Pageable pageable);

}
