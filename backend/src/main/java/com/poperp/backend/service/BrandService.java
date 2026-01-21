package com.poperp.backend.service;

import com.poperp.backend.dto.BrandResponseDto;
import com.poperp.backend.entity.Brands;
import com.poperp.backend.repository.BrandRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BrandService {

    private final BrandRepository brandRepository;

    public Page<BrandResponseDto> getActiveBrands(int page) {
        int size = 10;

        return brandRepository.findByActiveTrue(
                PageRequest.of(page, size)
        ).map(BrandResponseDto::from);
    }

    public BrandResponseDto getBrand(Long id) {
        Brands brand = brandRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("브랜드 없음"));

        return BrandResponseDto.from(brand);
    }
}
