package raf.microservice.components.userservice.service.impl;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import raf.microservice.components.userservice.dto.*;
import raf.microservice.components.userservice.exceptions.NotFoundException;
import raf.microservice.components.userservice.mapper.ManagerMapper;
import raf.microservice.components.userservice.model.Manager;
import raf.microservice.components.userservice.model.Token;
import raf.microservice.components.userservice.repository.ManagerRepository;
import raf.microservice.components.userservice.repository.TokenRepository;
import raf.microservice.components.userservice.service.JwtService;
import raf.microservice.components.userservice.service.ManagerService;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ManagerServiceImpl implements ManagerService {

    private final ManagerRepository managerRepository;
    private final ManagerMapper managerMapper;
    private final JwtService jwtService;
    private final TokenRepository tokenRepository;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final CustomUserDetailsService customUserDetailsService;

    public ManagerServiceImpl(ManagerRepository managerRepository, ManagerMapper managerMapper, JwtService jwtService,
                              TokenRepository tokenRepository, AuthenticationManager authenticationManager,
                              PasswordEncoder passwordEncoder, CustomUserDetailsService customUserDetailsService){
        this.managerMapper = managerMapper;
        this.managerRepository = managerRepository;
        this.jwtService = jwtService;
        this.tokenRepository = tokenRepository;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.customUserDetailsService = customUserDetailsService;
    }

    @Override
    public AuthenticationResponseDto add(ManagerCreateDto managerCreateDto) {
        Manager manager = managerMapper.managerCreateDtoToManager(managerCreateDto);
        managerRepository.save(manager);

        String jwtToken = jwtService.generateToken(manager);
        String refreshToken = jwtService.generateRefreshToken(manager);

        AuthenticationResponseDto authenticationResponseDto = new AuthenticationResponseDto();
        authenticationResponseDto.setAccessToken(jwtToken);
        authenticationResponseDto.setRefreshToken(refreshToken);
        saveUserToken(manager, refreshToken);

        return authenticationResponseDto;
    }

    private void saveUserToken(Manager user, String jwt){
        Token token = new Token();
        token.setToken(jwt);
        token.setUsersDetails(user);
        token.setExpired(false);
        token.setRevoked(false);
        tokenRepository.save(token);
    }

    @Override
    public Manager findUsername(String username) {
        return managerRepository.findManagerByUsername(username).orElse(null);
    }

    @Override
    public AuthenticationResponseDto authenticate(AuthLoginDto authLoginDto) {
        customUserDetailsService.setUserType("MANAGER");
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authLoginDto.getUsername(),
                        authLoginDto.getPassword()
                )
        );

        Manager manager = managerRepository.findManagerByUsername(authLoginDto.getUsername()).orElseThrow();

        String jwtToken = jwtService.generateToken(manager);
        String refreshToken = jwtService.generateRefreshToken(manager);
        revokeAllUserTokens(manager);

        AuthenticationResponseDto authenticationResponseDto = new AuthenticationResponseDto();
        authenticationResponseDto.setAccessToken(jwtToken);
        authenticationResponseDto.setRefreshToken(refreshToken);
        saveUserToken(manager, refreshToken);

        return authenticationResponseDto;
    }

    @Override
    public ManagerDto getMe(String authorization) { // TODO: transfer to JWT class
        String token = authorization.substring(7);
        Optional<Manager> manager = managerRepository.findManagerByUsername(jwtService.extractUsername(token));
        if(manager.isEmpty()) throw new NotFoundException("Manager not found");
        return managerMapper.managerToManagerDto(manager.get());
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
            Manager user = managerRepository.findManagerByUsername(username)
                    .orElseThrow();

            boolean check = true;
            boolean exist = false;

            List<Token> allTokens = tokenRepository.findAllValidTokenByUsersDetails(user);
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

            if (jwtService.isTokenValid(refreshToken, user) && check && exist) {
                System.out.println(allTokens);
                String accessToken = jwtService.generateToken(user);
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
    public ManagerDto edit(String authorization, ManagerEditDto managerEditDto) {
        String token = authorization.substring(7);
        Optional<Manager> manager = managerRepository.findManagerByUsername(jwtService.extractUsername(token));
        if(manager.isEmpty()) throw new NotFoundException("Manager not found");

        Manager managerNew = manager.get();
        managerNew.setEmail(managerEditDto.getEmail());
        managerNew.setName(managerEditDto.getName());
        managerNew.setLastName(managerEditDto.getLastName());
        managerNew.setDateBirth(managerEditDto.getDateBirth());
        managerNew.setDateEmployment(managerEditDto.getDateEmployment());
        managerNew.setSportsHall(managerEditDto.getSportsHall());
        managerRepository.save(managerNew);
        return managerMapper.managerToManagerDto(managerNew);
    }

    private void revokeAllUserTokens(Manager user) { // TODO: transfer to JWT class
        var validUserTokens = tokenRepository.findAllValidTokenByUsersDetails(user);
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

}