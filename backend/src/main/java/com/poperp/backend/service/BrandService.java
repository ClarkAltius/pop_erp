package com.poperp.backend.service;

import com.poperp.backend.dto.BrandResponseDto;
import com.poperp.backend.repository.BrandRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BrandService {

    private final BrandRepository brandRepository;

    public List<BrandResponseDto> getActiveBrands() {
        return brandRepository.findByActiveTrue()
                .stream()
                .map(BrandResponseDto::from)
                .toList();
    }
}
