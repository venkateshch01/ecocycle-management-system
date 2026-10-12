package com.ewaste.backend;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/settings")
public class SiteSettingController {

    private final SiteSettingRepository repository;

    public SiteSettingController(SiteSettingRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<SiteSetting> getSettings() {
        return repository.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public SiteSetting addSetting(@RequestBody SiteSetting setting) {
        return repository.save(setting);
    }

    @PutMapping("/{id}")
    public SiteSetting updateSetting(
            @PathVariable Long id,
            @RequestBody SiteSetting setting) {

        SiteSetting existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Setting not found"));

        existing.setSiteName(setting.getSiteName());
        existing.setContactEmail(setting.getContactEmail());

        return repository.save(existing);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteSetting(@PathVariable Long id) {
        repository.deleteById(id);
    }
}