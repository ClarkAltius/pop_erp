package com.poperp.backend.service;

import com.poperp.backend.dto.AdminCreateUserRequest;
import com.poperp.backend.entity.HrEmployee;
import com.poperp.backend.entity.SysUser;
import com.poperp.backend.repository.HrEmployeeRepository;
import com.poperp.backend.repository.SysUserRepository;
import com.poperp.backend.response.UserResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class AdminUserService {

    private final SysUserRepository sysUserRepository;
    private final HrEmployeeRepository hrEmployeeRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public UserResponse createUserByAdmin(AdminCreateUserRequest req) {

        // 이메일 중복
        if (sysUserRepository.existsByEmail(req.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "EMAIL_EXISTS");
        }

        /*
        if (req.getBrandId() != null &&
                !brandRepository.existsById(req.getBrandId())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "INVALID_BRAND_ID"
            );
        }
        */


        // 역할별 필수 필드 검증
        validateRoleScope(req);

        SysUser user = SysUser.builder()
                .email(req.getEmail())
                .passwordHash(passwordEncoder.encode(req.getPassword()))
                .fullName(req.getFullName())
                .role(req.getRole())
                .brandId(req.getBrandId())
                .defaultPopupStoreId(req.getPopupStoreId())
                .isActive(true)
                .build();

        sysUserRepository.save(user);

        HrEmployee employee = HrEmployee.builder()
                .user(user)
                .hourlyRate(req.getHourlyRate())
                .hiredDate(
                        req.getHiredDate() != null
                                ? req.getHiredDate()
                                : LocalDate.now()
                )
                .emergencyContact(req.getEmergencyContact())
                .build();

        hrEmployeeRepository.save(employee);

        return UserResponse.from(user);
    }

    private void validateRoleScope(AdminCreateUserRequest req) {
        switch (req.getRole()) {
            case BRAND_MANAGER -> {
                if (req.getBrandId() == null) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                            "BRAND_MANAGER requires brandId");
                }
            }
            case STORE_MANAGER, CASHIER -> {
                if (req.getPopupStoreId() == null) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                            "Store staff requires popupStoreId");
                }
            }
            default -> {
            }
        }
    }
}

