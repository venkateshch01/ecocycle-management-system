package com.ewaste.backend;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CollectionRequestRepository
        extends JpaRepository<CollectionRequest, Long> {
}