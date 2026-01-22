package com.poperp.backend.repository;

import com.poperp.backend.entity.Brands;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BrandRepository extends JpaRepository<Brands, Long> {
    Page<Brands> findByActiveTrue(Pageable pageable);
}
