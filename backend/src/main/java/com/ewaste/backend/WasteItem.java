
package com.ewaste.backend;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class WasteItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String itemName;
    private String category;
    private Integer quantity;
    private Double weight;
    private String conditionStatus;
    private String collectionAddress;
    private String status;

    public WasteItem() {
    }

    public Long getId() {
        return id;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Integer getQuantity() {
        return quantity;
    }
    public Double getWeight() { return weight; }
public void setWeight(Double weight) { this.weight = weight; }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getConditionStatus() {
        return conditionStatus;
    }

    public void setConditionStatus(String conditionStatus) {
        this.conditionStatus = conditionStatus;
    }

    public String getCollectionAddress() {
        return collectionAddress;
    }

    public void setCollectionAddress(String collectionAddress) {
        this.collectionAddress = collectionAddress;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
