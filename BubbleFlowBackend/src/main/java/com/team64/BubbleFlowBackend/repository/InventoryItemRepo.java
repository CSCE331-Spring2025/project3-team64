package com.team64.BubbleFlowBackend.repository;

import com.team64.BubbleFlowBackend.model.InventoryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InventoryItemRepo extends JpaRepository<InventoryItem, Integer> {
    
}