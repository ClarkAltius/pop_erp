package com.poperp.backend.service;

import com.poperp.backend.dto.BrandResponseDto;
import com.poperp.backend.repository.BrandRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BrandService {

    private final BrandRepository brandRepository;

    public Page<BrandResponseDto> getActiveBrands(Pageable pageable) {
        return brandRepository.findByActiveTrue(pageable);
    }

    public Page<BrandResponseDto> getAllBrands(Pageable pageable) {
        return brandRepository.findAllBrands(pageable);
    }
}
