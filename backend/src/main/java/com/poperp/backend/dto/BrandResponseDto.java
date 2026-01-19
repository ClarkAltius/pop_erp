package com.poperp.backend.dto;

import com.poperp.backend.entity.Brands;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class BrandResponseDto {

    private final Long id;
    private final String name;

    public static BrandResponseDto from(Brands brands) {
        return new BrandResponseDto(
                brands.getId(),
                brands.getName()
        );
    }
}
