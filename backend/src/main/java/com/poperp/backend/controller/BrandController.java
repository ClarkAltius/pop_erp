package com.poperp.backend.controller;

import com.poperp.backend.dto.BrandResponseDto;
import com.poperp.backend.entity.Brands;
import com.poperp.backend.service.BrandService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/brands")
public class BrandController {

    private final BrandService brandService;

    @GetMapping
    public Page<BrandResponseDto> getBrands(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "true") boolean activeOnly
    ) {
        return brandService.getBrands(page, activeOnly);
    }

    @GetMapping("/{id}")
    public BrandResponseDto getBrand(@PathVariable Long id) {
        return brandService.getBrand(id);
    }
    @GetMapping("/test")
    public String test() {
        return "OK";
    }

}
