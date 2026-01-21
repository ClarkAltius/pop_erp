package com.poperp.backend.controller;

import com.poperp.backend.dto.BrandResponseDto;
import com.poperp.backend.service.BrandService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/brands")
public class BrandController {

    private final BrandService brandService;

    @GetMapping
    public List<BrandResponseDto> getBrands() {
        return brandService.getBrands();
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
