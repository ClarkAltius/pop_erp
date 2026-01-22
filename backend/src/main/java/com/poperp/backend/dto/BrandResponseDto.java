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
    private BigDecimal commissionRate;
    private String contactEmail;
    private boolean isActive;

    public static BrandResponseDto from(Brands brand) {
        return new BrandResponseDto(
                brand.getId(),
                brand.getName(),
                brand.getCommissionRate(),
                brand.getContactEmail(),
                brand.isActive()
        );
    }
}
