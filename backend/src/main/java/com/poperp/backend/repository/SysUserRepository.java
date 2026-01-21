package com.poperp.backend.repository;

import com.poperp.backend.entity.SysUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SysUserRepository extends JpaRepository<SysUser, Long> {
    Optional<SysUser> findByEmailAndIsActiveTrue(String email);
    boolean existsByEmail(String email);
}

