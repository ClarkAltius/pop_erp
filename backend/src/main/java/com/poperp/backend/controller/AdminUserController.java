package com.poperp.backend.controller;

import com.poperp.backend.dto.AdminCreateUserRequest;
import com.poperp.backend.response.UserResponse;
import com.poperp.backend.service.AdminUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AdminUserController {

    private final AdminUserService adminUserService;

    @PostMapping
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @RequestMapping("/api/users")
    public ResponseEntity<UserResponse> createUserByAdmin(
            @RequestBody @Valid AdminCreateUserRequest request
    ) {
        UserResponse response = adminUserService.createUserByAdmin(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}

