package com.poperp.backend.service;

import com.poperp.backend.dto.BrandResponseDto;
import com.poperp.backend.dto.CreateBrandRequestDto;
import com.poperp.backend.entity.Brands;
import com.poperp.backend.repository.BrandRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
@Transactional
public class BrandService {

    private final BrandRepository brandRepository;

    // 활성 브랜드 조회
    public Page<BrandResponseDto> getActiveBrands(Pageable pageable) {
        return brandRepository.findByActiveTrue(pageable)
                .map(BrandResponseDto::from);
    }

    // 전체 브랜드 조회
    public Page<BrandResponseDto> getAllBrands(Pageable pageable) {
        return brandRepository.findAll(pageable)
                .map(BrandResponseDto::from);
    }

    public BrandResponseDto createBrand(CreateBrandRequestDto request) {

        if (brandRepository.existsByName(request.getName())) {
            throw new CustomException(
                    "BRAND_NAME_DUPLICATE",
                    "Brand name already exists."
            );
        }

        Brands brand = Brands.builder()
                .name(request.getName())
                .commissionRate(
                        request.getCommissionRate() != null
                                ? request.getCommissionRate()
                                : BigDecimal.ZERO
                )
                .contactEmail(request.getContactEmail())
                .isActive(true)
                .build();

        Brands saved = brandRepository.save(brand);

        return new BrandResponseDto(
                saved.getId(),
                saved.getName(),
                saved.getCommissionRate(),
                saved.getContactEmail(),
                saved.isActive()
        );
    }
}
