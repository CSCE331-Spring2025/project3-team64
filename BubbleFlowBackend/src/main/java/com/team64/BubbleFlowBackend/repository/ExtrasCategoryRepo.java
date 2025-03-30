package com.team64.BubbleFlowBackend.repository;

import com.team64.BubbleFlowBackend.model.ExtrasCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExtrasCategoryRepo extends JpaRepository<ExtrasCategory, Integer> {
    // Automatic inheriting CRUD operations from JpaRepository
    // No additional methods unless you want to define custom queries I think
}