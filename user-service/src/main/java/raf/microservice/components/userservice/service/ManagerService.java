package raf.microservice.components.userservice.service;

import raf.microservice.components.userservice.dto.ManagerCreateDto;
import raf.microservice.components.userservice.dto.ManagerDto;
import raf.microservice.components.userservice.model.Manager;

public interface ManagerService {
    ManagerDto add(ManagerCreateDto managerCreateDto);
    Manager findUsername(String username);
}
