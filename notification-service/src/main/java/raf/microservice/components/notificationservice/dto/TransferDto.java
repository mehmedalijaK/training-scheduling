package raf.microservice.components.notificationservice.dto;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;

@Getter
@Setter
public class TransferDto {

    @NotBlank(message = "Email cannot be empty")
    @Email
    private String emailReceiver;

    @NotBlank(message = "Type name can not be empty")
    private String typeName;

    @NotBlank
    private HashMap<String, String> params;

    @NotBlank
    private String username;

    @Override
    public String toString() {
        return "TransferDto{" +
                "emailReceiver='" + emailReceiver + '\'' +
                ", typeName='" + typeName + '\'' +
                ", params=" + params +
                ", username='" + username + '\'' +
                '}';
    }
}
