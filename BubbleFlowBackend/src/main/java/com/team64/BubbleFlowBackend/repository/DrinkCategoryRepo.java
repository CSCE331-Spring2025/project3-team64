package com.team64.BubbleFlowBackend.repository;

import com.team64.BubbleFlowBackend.model.DrinkCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DrinkCategoryRepo extends JpaRepository<DrinkCategory, Integer> {

}
