package raf.microservice.components.notificationservice.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "notifications")
@Getter
@Setter
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "mail_receiver", nullable = false)
    private String mailReceiver;

    @ManyToOne(optional = false)
    private Type type;

    @Column(name = "message", nullable = false)
    private String message;

    public Notification(){}

}
