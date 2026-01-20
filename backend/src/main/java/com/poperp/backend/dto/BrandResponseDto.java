package com.poperp.backend.dto;

import com.poperp.backend.entity.Brands;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@AllArgsConstructor
public class BrandResponseDto {

    private Long id;
    private String name;
    private BigDecimal commission;
    private String email;
    private boolean active;

    public static BrandResponseDto from(Brands brands) {
        return new BrandResponseDto(
                brands.getId(),
                brands.getName(),
                brands.getCommision(),
                brands.getEmail(),
                brands.isActive()
        );
    }
}
