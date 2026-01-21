package com.poperp.backend.repository;

import com.poperp.backend.entity.HrEmployee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HrEmployeeRepository extends JpaRepository<HrEmployee, Long> {
}
