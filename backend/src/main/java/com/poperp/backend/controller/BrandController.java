package com.poperp.backend.controller;

import com.poperp.backend.dto.BrandResponseDto;
import com.poperp.backend.service.BrandService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
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
//    @GetMapping
//    public ResponseEntity<?> getBrands() {
//        List<BrandResponseDto> list = brandService.getBrands();
//
//        return ResponseEntity.ok(
//                Map.of(
//                        "success", true,
//                        "data", list,
//                        "error", null
//                )
//        );
//    }

    @GetMapping
    public ResponseEntity<?> getBrands(@RequestParam(defaultValue = "0") int page) {
        Pageable pageable = PageRequest.of(page, 10); // 한 페이지 10개
        Page<BrandResponseDto> brandPage = brandService.getBrands(pageable);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", brandPage.getContent());
        response.put("totalElements", brandPage.getTotalElements());
        response.put("totalPages", brandPage.getTotalPages());
        response.put("page", brandPage.getNumber());
        response.put("error", null);

        return ResponseEntity.ok(response);
    }
}
