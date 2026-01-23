package com.poperp.backend.service;

import com.poperp.backend.dto.BrandResponseDto;
import com.poperp.backend.entity.Brands;
import com.poperp.backend.repository.BrandRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BrandService {

    private final BrandRepository brandRepository;

    public BrandResponseDto getBrand(Long id) {
        Brands brand = brandRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("BRAND_NOT_FOUND"));

        return BrandResponseDto.from(brand);
}

//    public List<BrandResponseDto> getBrands(){
//        return brandRepository.findAll()
//                .stream()
//                .map(BrandResponseDto::from)
//                .toList();
//
//    }

    public Page<BrandResponseDto> getBrands(Pageable pageable) {
        return brandRepository.findAll(pageable)
                .map(BrandResponseDto::from); // Page<Brands> → Page<DTO>
    }
}
