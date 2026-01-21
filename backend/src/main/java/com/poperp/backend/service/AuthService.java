package com.poperp.backend.service;

import com.poperp.backend.dto.LoginRequest;
import com.poperp.backend.dto.LoginResponse;
import com.poperp.backend.dto.UserInfo;
import com.poperp.backend.entity.SysUser;
import com.poperp.backend.repository.SysUserRepository;
import com.poperp.backend.security.JwtProvider;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final SysUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    @Transactional
    public LoginResponse login(LoginRequest request) {

        SysUser user = userRepository.findByEmailAndIsActiveTrue(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid password");
        }

        user.setLastLogin(LocalDateTime.now());

        String token = jwtProvider.createToken(user);

        return new LoginResponse(
                token,
                new UserInfo(
                        user.getId(),
                        user.getEmail(),
                        user.getFullName(),
                        user.getRole(),
                        user.getBrandId(),
                        user.getDefaultPopupStoreId()
                )
        );
    }
}

