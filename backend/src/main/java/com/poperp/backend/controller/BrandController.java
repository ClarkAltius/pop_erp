package com.poperp.backend.controller;

import com.poperp.backend.dto.BrandResponseDto;
import com.poperp.backend.service.BrandService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/brands")
@RequiredArgsConstructor
public class BrandController {

    private final BrandService brandService;

    @GetMapping
    public Page<BrandResponseDto> getActiveBrands(Pageable pageable) {
        return brandService.getActiveBrands(pageable);
    }
    @GetMapping("/all")
    public Page<BrandResponseDto> getAllBrands(Pageable pageable) {
        return brandService.getAllBrands(pageable);
    }
}