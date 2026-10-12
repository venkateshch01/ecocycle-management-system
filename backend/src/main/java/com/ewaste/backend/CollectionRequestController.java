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
@RequestMapping("/api/requests")
public class CollectionRequestController {

    private final CollectionRequestRepository repository;

    public CollectionRequestController(
            CollectionRequestRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<CollectionRequest> getRequests() {
        return repository.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CollectionRequest addRequest(
            @RequestBody CollectionRequest request) {
        return repository.save(request);
    }

    @PutMapping("/{id}")
    public CollectionRequest updateRequest(
            @PathVariable Long id,
            @RequestBody CollectionRequest request) {

        CollectionRequest existing = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Request not found"));

        existing.setName(request.getName());
        existing.setItem(request.getItem());
        existing.setQuantity(request.getQuantity());
        existing.setStatus(request.getStatus());

        return repository.save(existing);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteRequest(@PathVariable Long id) {
        repository.deleteById(id);
    }
}