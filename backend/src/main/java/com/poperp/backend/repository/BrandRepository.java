package com.poperp.backend.repository;

import com.poperp.backend.dto.BrandResponseDto;
import com.poperp.backend.entity.Brands;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BrandRepository extends JpaRepository<Brands, Long> {

    @Query("""
        select new com.poperp.backend.dto.BrandResponseDto(
            b.id,
            b.name,
            b.commissionRate,
            b.contactEmail,
            b.isActive
        )
        from Brands b
        where b.isActive = true
    """)
    Page<BrandResponseDto> findByActiveTrue(Pageable pageable);

    @Query("""
        select new com.poperp.backend.dto.BrandResponseDto(
            b.id,
            b.name,
            b.commissionRate,
            b.contactEmail,
            b.isActive
        )
        from Brands b
    """)
    Page<BrandResponseDto> findAllBrands(Pageable pageable);
}
