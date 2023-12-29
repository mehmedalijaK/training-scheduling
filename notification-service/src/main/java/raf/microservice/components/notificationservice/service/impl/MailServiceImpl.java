package raf.microservice.components.notificationservice.service.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import raf.microservice.components.notificationservice.dto.NotificationDto;
import raf.microservice.components.notificationservice.mapper.NotificationMapper;
import raf.microservice.components.notificationservice.repository.NotificationRepository;
import raf.microservice.components.notificationservice.service.MailService;

@Service
@Transactional
public class MailServiceImpl implements MailService {

    private final NotificationRepository notificationRepository;
    private final NotificationMapper notificationMapper;

    public MailServiceImpl(NotificationRepository notificationRepository, NotificationMapper notificationMapper){
        this.notificationRepository = notificationRepository;
        this.notificationMapper = notificationMapper;
    }


    @Override
    public Page<NotificationDto> findAll(Pageable pageable) {
        return notificationRepository.findAll(pageable)
                .map(notificationMapper::notificationToNotificationDto);
    }
}
