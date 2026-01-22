package com.poperp.backend.dto;

import com.poperp.backend.constant.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserInfo {
    private Long id;
    private String email;
    private String fullName;
    private Role role;
    private Long brandId;
    private Long popupStoreId;
}

