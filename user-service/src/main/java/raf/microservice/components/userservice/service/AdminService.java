package raf.microservice.components.userservice.service;

import raf.microservice.components.userservice.dto.*;

public interface AdminService {
    AuthenticationResponseDto authenticate(AdminLoginDto adminLoginDto);

    SessionTokenDto refreshToken(String authorization);

    AdminDto getMe(String authorization);

    AdminDto edit(String authorization, AdminEditDto adminEditDto);

    BanUserDto banUser(Long id);
    BanManagerDto banManager(Long id);

    BanUserDto unbanUser(Long id);
    BanManagerDto unbanManger(Long id);
}
