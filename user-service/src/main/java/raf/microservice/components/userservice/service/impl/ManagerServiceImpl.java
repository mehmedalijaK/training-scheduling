package raf.microservice.components.userservice.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import raf.microservice.components.userservice.dto.ManagerCreateDto;
import raf.microservice.components.userservice.dto.ManagerDto;
import raf.microservice.components.userservice.mapper.ManagerMapper;
import raf.microservice.components.userservice.model.Manager;
import raf.microservice.components.userservice.repository.ManagerRepository;
import raf.microservice.components.userservice.service.ManagerService;

@Service
@Transactional
public class ManagerServiceImpl implements ManagerService {

    private ManagerRepository managerRepository;
    private ManagerMapper managerMapper;

    public ManagerServiceImpl(ManagerRepository managerRepository, ManagerMapper managerMapper){
        this.managerMapper = managerMapper;
        this.managerRepository = managerRepository;
    }

    @Override
    public ManagerDto add(ManagerCreateDto managerCreateDto) {
        Manager manager = managerMapper.managerCreateDtoToManager(managerCreateDto);
        managerRepository.save(manager);
        return managerMapper.managerToManagerDto(manager);
    }

    @Override
    public Manager findUsername(String username) {
        return managerRepository.findManagerByUsername(username).orElse(null);
    }
}