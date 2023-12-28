package raf.microservice.scheduletraining.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import raf.microservice.scheduletraining.dto.GymDto;

public interface GymService {
    GymDto add(GymDto gymDTO);
    GymDto updateById(Long gymId, GymDto gymDTO);
    GymDto findById(Long gymId);
    Page<GymDto> findAll(Pageable pageable);
    void deleteById(Long gymId);
}
