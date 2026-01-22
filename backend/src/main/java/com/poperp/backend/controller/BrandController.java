package com.poperp.backend.controller;

import com.poperp.backend.dto.BrandResponseDto;
import com.poperp.backend.service.BrandService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/brands")
public class BrandController {

    private final BrandService brandService;

    // 브랜드 단건 조회
    @GetMapping("/{id}")
    public ResponseEntity<?> getBrand(@PathVariable Long id) {
        BrandResponseDto dto = brandService.getBrand(id);

        return ResponseEntity.ok(
                Map.of(
                        "success", true,
                        "data", dto,
                        "error", null
                )
        );
    }

    // 브랜드 전체 조회 (active 상관없이)
    @GetMapping
    public ResponseEntity<?> getBrands() {
        List<BrandResponseDto> list = brandService.getBrands();

        return ResponseEntity.ok(
                Map.of(
                        "success", true,
                        "data", list,
                        "error", null
                )
        );
    }
}
