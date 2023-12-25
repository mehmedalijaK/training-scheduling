package raf.microservice.components.userservice.service.impl;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import raf.microservice.components.userservice.dto.AuthenticationResponseDto;
import raf.microservice.components.userservice.dto.UserCreateDto;
import raf.microservice.components.userservice.dto.UserDto;
import raf.microservice.components.userservice.dto.UserLoginDto;
import raf.microservice.components.userservice.mapper.UserMapper;
import raf.microservice.components.userservice.model.Token;
import raf.microservice.components.userservice.model.User;
import raf.microservice.components.userservice.repository.TokenRepository;
import raf.microservice.components.userservice.repository.UserRepository;
import raf.microservice.components.userservice.service.JwtService;
import raf.microservice.components.userservice.service.UserService;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private UserMapper userMapper;
    private JwtService jwtService;
    private TokenRepository tokenRepository;
    private AuthenticationManager authenticationManager;
    private PasswordEncoder passwordEncoder;
    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper, JwtService jwtService, TokenRepository tokenRepository
    , AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.jwtService = jwtService;
        this.tokenRepository = tokenRepository;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public AuthenticationResponseDto add(UserCreateDto userCreateDto) {
        User user = userMapper.userCreateDtoToUser(userCreateDto);
        userRepository.save(user);

        String jwtToken = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        AuthenticationResponseDto authenticationResponseDto = new AuthenticationResponseDto();
        authenticationResponseDto.setAccessToken(jwtToken);
        authenticationResponseDto.setRefreshToken(refreshToken);
        saveUserToken(user, refreshToken);

        return authenticationResponseDto;
    }

    @Override
    public AuthenticationResponseDto authenticate(UserLoginDto userLoginDto) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        userLoginDto.getUsername(),
                        userLoginDto.getPassword()
                )
        );

        User user = userRepository.findUserByUsername(userLoginDto.getUsername()).orElseThrow();

        if (!passwordEncoder.matches(userLoginDto.getPassword(), user.getPassword())){
            return null;
        }

        String jwtToken = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);
        revokeAllUserTokens(user);

        AuthenticationResponseDto authenticationResponseDto = new AuthenticationResponseDto();
        authenticationResponseDto.setAccessToken(jwtToken);
        authenticationResponseDto.setRefreshToken(refreshToken);
        saveUserToken(user, refreshToken);

        return authenticationResponseDto;
    }

    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user);
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    private void saveUserToken(User user, String jwt){
        Token token = new Token();
        token.setToken(jwt);
        token.setUser(user);
        token.setExpired(false);
        token.setRevoked(false);
        tokenRepository.save(token);
    }

    @Override
    public User findUsername(String username) {
        return userRepository.findUserByUsername(username).orElse(null);
    }
}
