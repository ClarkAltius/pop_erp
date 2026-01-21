package com.poperp.backend.entity;

import com.poperp.backend.constant.Role;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "sys_user")
@Getter
@Setter
@NoArgsConstructor
public class SysUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column(name = "brand_id")
    private Long brandId;

    @Column(name = "default_popup_store_id")
    private Long defaultPopupStoreId;

    @Column(name = "is_active")
    private boolean active;

    private LocalDateTime lastLogin;

    private LocalDateTime createdAt;
}

