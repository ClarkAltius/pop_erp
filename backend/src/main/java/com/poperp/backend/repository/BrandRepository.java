package com.poperp.backend.repository;

import com.poperp.backend.entity.Brands;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Arrays;
import java.util.List;

public interface BrandRepository extends JpaRepository<Brands, Long> {

    List<Brands> findByActiveTrue();

}
