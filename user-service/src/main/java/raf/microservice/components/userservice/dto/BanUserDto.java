package raf.microservice.components.userservice.dto;

import org.springframework.security.core.userdetails.UserDetails;
import raf.microservice.components.userservice.model.User;

public class BanUserDto {
    UserDto user;

    boolean banned;

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }

    public boolean isBanned() {
        return banned;
    }

    public void setBanned(boolean banned) {
        this.banned = banned;
    }
}
