package raf.microservice.components.userservice.service.impl;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import raf.microservice.components.userservice.dto.*;
import raf.microservice.components.userservice.mapper.AdminMapper;
import raf.microservice.components.userservice.model.Admin;
import raf.microservice.components.userservice.model.Manager;
import raf.microservice.components.userservice.model.Token;
import raf.microservice.components.userservice.model.User;
import raf.microservice.components.userservice.repository.AdminRepository;
import raf.microservice.components.userservice.repository.TokenRepository;
import raf.microservice.components.userservice.service.AdminService;
import raf.microservice.components.userservice.service.JwtService;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {

    private final AdminRepository adminRepository;
    private final JwtService jwtService;
    private final TokenRepository tokenRepository;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final CustomUserDetailsService customUserDetailsService;
    private final AdminMapper adminMapper;

    public AdminServiceImpl(JwtService jwtService, TokenRepository tokenRepository,
                            AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder,
                            CustomUserDetailsService customUserDetailsService, AdminRepository adminRepository,
                            AdminMapper adminMapper) {
        this.jwtService = jwtService;
        this.tokenRepository = tokenRepository;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.customUserDetailsService = customUserDetailsService;
        this.adminRepository = adminRepository;
        this.adminMapper = adminMapper;
    }

    @Override
    public AuthenticationResponseDto authenticate(AdminLoginDto adminLoginDto) {
        customUserDetailsService.setUserType("ADMIN");
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        adminLoginDto.getUsername(),
                        adminLoginDto.getPassword()
                )
        );
        Admin admin = adminRepository.findAdminByUsername(adminLoginDto.getUsername()).orElseThrow();

        if (!passwordEncoder.matches(adminLoginDto.getPassword(), admin.getPassword())){
            return null;
        }

        String jwtToken = jwtService.generateToken(admin);
        String refreshToken = jwtService.generateRefreshToken(admin);
        revokeAllUserTokens(admin);

        AuthenticationResponseDto authenticationResponseDto = new AuthenticationResponseDto();
        authenticationResponseDto.setAccessToken(jwtToken);
        authenticationResponseDto.setRefreshToken(refreshToken);
        saveUserToken(admin, refreshToken);

        return authenticationResponseDto;
    }

    @Override
    public SessionTokenDto refreshToken(String authorization) {
        String refreshToken;
        String username;
        if(authorization == null ||!authorization.startsWith("Bearer "))
            return null;

        refreshToken = authorization.substring(7);
        username = jwtService.extractUsername(refreshToken);

        if (username != null) {
            Admin admin = adminRepository.findAdminByUsername(username)
                    .orElseThrow();

            boolean check = true;
            boolean exist = false;

            List<Token> allTokens = tokenRepository.findAllValidTokenByUserDetails(admin);
            Token update = null;
            for(Token t : allTokens){
                if (t.token.equals(refreshToken)) {
                    exist = true;
                    update = t;
                    if(t.expired || t.revoked)
                        check = false;

                    break;
                }
            }

            if (jwtService.isTokenValid(refreshToken, admin) && check && exist) {
                System.out.println(allTokens);
                String accessToken = jwtService.generateToken(admin);
                SessionTokenDto sessionTokenDto = new SessionTokenDto();
                sessionTokenDto.setAccessToken(accessToken);
                return sessionTokenDto;
            }

            if(update != null){  // token does not exist
                update.setRevoked(true);
                update.setExpired(true);
                tokenRepository.save(update);
            }
        }

        return null;
    }

    @Override
    public AdminDto getMe(String authorization) {
        String token = authorization.substring(7);
        Optional<Admin> admin = adminRepository.findAdminByUsername(jwtService.extractUsername(token));
        if(admin.isEmpty()) return null;
        return adminMapper.adminToAdminDto(admin.get());
    }

    @Override
    public AdminDto edit(String authorization, AdminEditDto adminEditDto) {
        String token = authorization.substring(7);
        Optional<Admin> admin = adminRepository.findAdminByUsername(jwtService.extractUsername(token));
        if(admin.isEmpty()) return null;

        Admin adminNew = admin.get();
        adminNew.setEmail(adminEditDto.getEmail());
        adminNew.setName(adminEditDto.getName());
        adminNew.setLastName(adminEditDto.getLastName());
        adminNew.setDateBirth(adminEditDto.getDateBirth());
        adminRepository.save(adminNew);
        return adminMapper.adminToAdminDto(adminNew);
    }

    private void revokeAllUserTokens(Admin admin) {
        var validUserTokens = tokenRepository.findAllValidTokenByUserDetails(admin);
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    private void saveUserToken(Admin admin, String jwt){
        Token token = new Token();
        token.setToken(jwt);
        token.setUserDetails(admin);
        token.setExpired(false);
        token.setRevoked(false);
        tokenRepository.save(token);
    }

}
