package raf.microservice.components.notificationservice.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NotificationDto {

    @JsonProperty("type_name")
    private String typeName;

    @JsonProperty("mail_receiver")
    private String mailReceiver;

    @JsonProperty("message")
    private String message;

}
