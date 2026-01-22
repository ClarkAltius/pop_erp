package com.poperp.backend.dto;

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
}
