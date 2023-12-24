package raf.microservice.components.userservice.security;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import raf.microservice.components.userservice.dto.UserCreateDto;
import raf.microservice.components.userservice.model.User;
import raf.microservice.components.userservice.service.UserService;

import java.lang.reflect.Method;

@Aspect
@Configuration
public class CheckExistsAspect {

    private UserService userService;

    public CheckExistsAspect(UserService userService){
        this.userService = userService;
    }

    @Around("@annotation(raf.microservice.components.userservice.security.CheckExists)")
    public Object around(ProceedingJoinPoint joinPoint) throws Throwable {

        MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();
        Method method = methodSignature.getMethod();
        String username = null;

        for (int i = 0; i < methodSignature.getParameterNames().length; i++) {
            if (methodSignature.getParameterNames()[i].equals("userCreateDto")) {
                username =  ((UserCreateDto)joinPoint.getArgs()[i]).getUsername();
                break;
            }
        }

        if(username == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        if(userService.findUsername(username)!=null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        return joinPoint.proceed();
    }

}
