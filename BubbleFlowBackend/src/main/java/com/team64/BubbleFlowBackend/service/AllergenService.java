package com.team64.BubbleFlowBackend.service;

import com.team64.BubbleFlowBackend.model.Allergen;
import com.team64.BubbleFlowBackend.repository.AllergenRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.ArrayList;

@Service

public class AllergenService {
    @Autowired
    private AllergenRepo allergenRepo;

    public List<Allergen> getAllAllergens() {
        List<Object[]> results = allergenRepo.finsdAllergens();
        List<Allergen> allergens = new ArrayList<>();

        for (Object[] result : results) {
            String drinkName = (String) result[0];
            String allergenAlerts = (String) result[1];
            allergens.add(new Allergen(drinkName, allergenAlerts));
        }

        return allergens;
    }
}