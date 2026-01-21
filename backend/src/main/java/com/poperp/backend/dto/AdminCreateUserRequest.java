package com.poperp.backend.dto;

import com.poperp.backend.constant.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class AdminCreateUserRequest {

    @NotBlank
    private String email;

    @NotBlank
    private String password;

    @NotBlank
    private String fullName;

    @NotNull
    private Role role;

    private Long brandId;
    private Long popupStoreId;

    @NotNull
    private BigDecimal hourlyRate;

    private LocalDate hiredDate;
    private String emergencyContact;
}

