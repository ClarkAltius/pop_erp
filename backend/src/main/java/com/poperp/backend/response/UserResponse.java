package com.poperp.backend.response;

import com.poperp.backend.constant.Role;
import com.poperp.backend.entity.SysUser;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class UserResponse {

    private Long id;
    private String email;
    private String fullName;
    private Role role;
    private Long brandId;
    private Long popupStoreId;
    private LocalDateTime createdAt;

    public static UserResponse from(SysUser user) {
        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .role(user.getRole())
                .brandId(user.getBrandId())
                .popupStoreId(user.getDefaultPopupStoreId())
                .createdAt(user.getCreatedAt())
                .build();
    }
}

