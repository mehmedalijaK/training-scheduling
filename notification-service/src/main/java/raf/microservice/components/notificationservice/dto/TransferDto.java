package raf.microservice.components.notificationservice.dto;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransferDto {

    @NotBlank(message = "Email cannot be empty")
    @Email
    private String emailReceiver;

    @NotBlank(message = "Type name can not be empty")
    private String typeName;

    @NotBlank
    private String[] params;

}
