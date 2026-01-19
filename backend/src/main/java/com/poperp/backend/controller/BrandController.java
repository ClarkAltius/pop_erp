package com.poperp.backend.controller;

import com.poperp.backend.dto.BrandResponseDto;
import com.poperp.backend.service.BrandService;
import lombok.RequiredArgsConstructor;
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
    public List<BrandResponseDto> getActiveBrands(){
        return brandService.getActiveBrands();
    }
}
