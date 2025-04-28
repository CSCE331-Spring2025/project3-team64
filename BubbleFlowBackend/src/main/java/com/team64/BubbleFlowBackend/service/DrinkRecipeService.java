package com.team64.BubbleFlowBackend.service;

import com.team64.BubbleFlowBackend.model.DrinkRecipe;
import com.team64.BubbleFlowBackend.repository.DrinkRecipeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DrinkRecipeService {
    @Autowired
    private DrinkRecipeRepo drinkRecipeRepo;

    public List<DrinkRecipe> getAllDrinkRecipes() {
        return drinkRecipeRepo.findAll();
    }

    // public void deleteDrinkRecipeById(int drinkRecipeID) {
    //     System.out.println("Deleting drink recipe with ID: " + drinkRecipeID);
    //     drinkRecipeRepo.deleteById(drinkRecipeID);
    // }

    // public void saveDrinkRecipe(DrinkRecipe drinkRecipe) {
    //     System.out.println("Saving drink recipe: " + drinkRecipe.getDrink_recipe_id());
    //     drinkRecipeRepo.save(drinkRecipe);
    // }
}