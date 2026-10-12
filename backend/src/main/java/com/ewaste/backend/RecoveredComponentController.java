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
@RequestMapping("/api/components")
public class RecoveredComponentController {

    private final RecoveredComponentRepository repository;

    public RecoveredComponentController(
            RecoveredComponentRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<RecoveredComponent> getComponents() {
        return repository.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RecoveredComponent addComponent(
            @RequestBody RecoveredComponent component) {
        return repository.save(component);
    }

    @PutMapping("/{id}")
    public RecoveredComponent updateComponent(
            @PathVariable Long id,
            @RequestBody RecoveredComponent component) {

        RecoveredComponent existing = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Component not found"));

        existing.setName(component.getName());
        existing.setSource(component.getSource());
        existing.setQuantity(component.getQuantity());
        existing.setCondition(component.getCondition());

        return repository.save(existing);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteComponent(@PathVariable Long id) {
        repository.deleteById(id);
    }
}