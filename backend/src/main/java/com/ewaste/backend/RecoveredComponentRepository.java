package com.ewaste.backend;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RecoveredComponentRepository
        extends JpaRepository<RecoveredComponent, Long> {
}