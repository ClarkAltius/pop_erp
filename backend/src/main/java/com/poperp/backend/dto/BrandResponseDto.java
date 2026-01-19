package com.poperp.backend.dto;

import com.poperp.backend.entity.Brands;

public record BrandResponseDto(
        Long id,
        String name
) {
    public static BrandResponseDto from(Brands brands) {
        return new BrandResponseDto(
                brands.getId(),
                brands.getName()
        );
    }
}
