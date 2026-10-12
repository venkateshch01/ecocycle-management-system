
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
@RequestMapping("/api/recoveries")
public class RecoveryController {

    private final RecoveryRepository repository;

    public RecoveryController(RecoveryRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Recovery> getRecoveries() {
        return repository.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Recovery addRecovery(@RequestBody Recovery recovery) {
        return repository.save(recovery);
    }

    @PutMapping("/{id}")
    public Recovery updateRecovery(
            @PathVariable Long id,
            @RequestBody Recovery recovery) {

        Recovery existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recovery not found"));

        existing.setComponentName(recovery.getComponentName());
        existing.setQuantity(recovery.getQuantity());
        existing.setCondition(recovery.getCondition());
        existing.setStatus(recovery.getStatus());

        return repository.save(existing);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteRecovery(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
