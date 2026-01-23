package com.poperp.backend.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateBrandRequestDto {

    @NotBlank(message = "Brand name is required")
    private String name;

    @DecimalMin(value = "0.0", message = "Commission rate must be >= 0")
    @DecimalMax(value = "100.0", message = "Commission rate must be <= 100")
    private BigDecimal commissionRate;

    @Email(message = "Invalid email format")
    private String contactEmail;
}

