
package com.ewaste.backend;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/waste")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://localhost:5174"
})
public class WasteItemController {

    private final WasteItemRepository repository;

    public WasteItemController(WasteItemRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<WasteItem> getAllWasteItems() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<WasteItem> getWasteItem(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<WasteItem> addWasteItem(
            @RequestBody WasteItem item) {
        item.setStatus("Pending");
        item.setWeight(item.getWeight());
        WasteItem saved = repository.save(item);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WasteItem> updateWasteItem(
            @PathVariable Long id,
            @RequestBody WasteItem updatedItem) {

        return repository.findById(id).map(item -> {
            item.setItemName(updatedItem.getItemName());
            item.setCategory(updatedItem.getCategory());
            item.setQuantity(updatedItem.getQuantity());
            item.setWeight(updatedItem.getWeight());
            item.setConditionStatus(updatedItem.getConditionStatus());
            item.setCollectionAddress(updatedItem.getCollectionAddress());

            if (updatedItem.getStatus() != null) {
                item.setStatus(updatedItem.getStatus());
            }

            return ResponseEntity.ok(repository.save(item));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWasteItem(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
