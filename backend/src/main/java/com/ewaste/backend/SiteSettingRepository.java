package com.ewaste.backend;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SiteSettingRepository
        extends JpaRepository<SiteSetting, Long> {
}