package raf.microservice.components.userservice.service;

import raf.microservice.components.userservice.dto.*;

public interface AdminService {
    AuthenticationResponseDto authenticate(AdminLoginDto adminLoginDto);

    SessionTokenDto refreshToken(String authorization);

    AdminDto getMe(String authorization);

    AdminDto edit(String authorization, AdminEditDto adminEditDto);
}
