
package com.ewaste.backend;

import org.springframework.data.jpa.repository.JpaRepository;

public interface WasteItemRepository
        extends JpaRepository<WasteItem, Long> {
}
