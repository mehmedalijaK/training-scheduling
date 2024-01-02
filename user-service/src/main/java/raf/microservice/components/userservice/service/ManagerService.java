package raf.microservice.components.userservice.service;

import raf.microservice.components.userservice.dto.*;
import raf.microservice.components.userservice.model.Manager;

public interface ManagerService {
    VerifyTokenDto add(ManagerCreateDto managerCreateDto);
    Manager findUsername(String username);
    AuthenticationResponseDto authenticate(AuthLoginDto authLoginDto);

    ManagerDto getMe(String authorization);

    SessionTokenDto refreshToken(String authorization);

    ManagerDto edit(String authorization, ManagerEditDto managerEditDto);

    void verify(String id);
}
