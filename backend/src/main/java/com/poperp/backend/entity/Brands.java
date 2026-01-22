package com.poperp.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "brand")
@Getter
@NoArgsConstructor
public class Brands {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "commission_rate")
    private BigDecimal commission;

    @Column(name = "contact_email")
    private String email;

    @Column(name = "is_active", nullable = false)
    private boolean active;
}
