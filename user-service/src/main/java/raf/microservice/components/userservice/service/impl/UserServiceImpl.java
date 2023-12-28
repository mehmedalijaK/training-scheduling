package raf.microservice.components.userservice.service.impl;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import raf.microservice.components.userservice.dto.*;
import raf.microservice.components.userservice.mapper.UserMapper;
import raf.microservice.components.userservice.model.Token;
import raf.microservice.components.userservice.model.User;
import raf.microservice.components.userservice.repository.TokenRepository;
import raf.microservice.components.userservice.repository.UserRepository;
import raf.microservice.components.userservice.service.JwtService;
import raf.microservice.components.userservice.service.UserService;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final JwtService jwtService;
    private final TokenRepository tokenRepository;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final CustomUserDetailsService customUserDetailsService;
    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper, JwtService jwtService, TokenRepository tokenRepository
    , AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder, CustomUserDetailsService customUserDetailsService){
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.jwtService = jwtService;
        this.tokenRepository = tokenRepository;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.customUserDetailsService = customUserDetailsService;
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
        customUserDetailsService.setUserType("USER");
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

    private void revokeAllUserTokens(User user) { // TODO: transfer to JWT class
        var validUserTokens = tokenRepository.findAllValidTokenByUserDetails(user);
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    private void saveUserToken(User user, String jwt){ // TODO: transfer to JWT class
        Token token = new Token();
        token.setToken(jwt);
        token.setUserDetails(user);
        token.setExpired(false);
        token.setRevoked(false);
        tokenRepository.save(token);
    }

    @Override
    public User findUsername(String username) {
        return userRepository.findUserByUsername(username).orElse(null);
    }

    @Override
    public SessionTokenDto refreshToken(String authorization) { // TODO: transfer to JWT class
        String refreshToken;
        String username;
        if(authorization == null ||!authorization.startsWith("Bearer "))
            return null;

        refreshToken = authorization.substring(7);
        username = jwtService.extractUsername(refreshToken);

        if (username != null) {
            User user = userRepository.findUserByUsername(username)
                    .orElseThrow();

            boolean check = true;
            boolean exist = false;

            List<Token> allTokens = tokenRepository.findAllValidTokenByUserDetails(user);
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
    public UserDto getMe(String authorization) {
        String token = authorization.substring(7);
        Optional<User> user = userRepository.findUserByUsername(jwtService.extractUsername(token));
        if(user.isEmpty()) return null;
        return userMapper.userToUserDto(user.get());
    }

    @Override
    public UserDto edit(String authorization, UserEditDto userEditDto) {
        String token = authorization.substring(7);
        Optional<User> user = userRepository.findUserByUsername(jwtService.extractUsername(token));
        if(user.isEmpty()) return null;

        User userNew = user.get();
        userNew.setEmail(userEditDto.getEmail());
        userNew.setName(userEditDto.getName());
        userNew.setLastName(userEditDto.getLastName());
        userNew.setDateBirth(userEditDto.getDateBirth());
        userRepository.save(userNew);
        return userMapper.userToUserDto(userNew);
    }
}
