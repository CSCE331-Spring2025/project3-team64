package com.team64.BubbleFlowBackend.service;

import com.team64.BubbleFlowBackend.model.Drink;
import com.team64.BubbleFlowBackend.model.DrinkCategory;
import com.team64.BubbleFlowBackend.model.DrinkRaw;
import com.team64.BubbleFlowBackend.repository.DrinkCategoryRepo;
import com.team64.BubbleFlowBackend.repository.DrinkRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DrinkService {
    @Autowired
    private DrinkRepo drinkRepo;

    @Autowired
    private DrinkCategoryRepo drinkCategoryRepo;

    public List<Drink> getAllDrinks (){
        return drinkRepo.findAll();
    }

    //Delete a drink by ID
    @Transactional
    public void deleteDrinkById(int id) {
        Drink drink = drinkRepo.findById(id).orElse(null);
        //if drink is not null, delete it
        if (drink != null) {
            drinkRepo.delete(drink);
        }else{
            System.out.println("Drink with ID " + id + " not found.");
        }
    }

    //Add a drink
    public void addDrink(Drink drink, int categoryId) {
        DrinkCategory category = drinkCategoryRepo.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("category with ID " + categoryId + " not found"));
        drink.setDrink_category(category);

        // after setting category save drink bro
        drinkRepo.save(drink);
    }

    //Update a drink
    public void updateDrink(DrinkRaw drink) {
        Drink existingDrink = drinkRepo.findById(drink.getDrink_id()).orElse(null);
        if (existingDrink != null) {
            System.out.println("Updating drink "+ drink.getDrink_name() +" with ID: " + drink.getDrink_id());
            existingDrink.setDrink_name(drink.getDrink_name());
            existingDrink.setDrink_price(drink.getDrink_price());
            existingDrink.setActive_months(drink.getActive_months());
            drinkRepo.save(existingDrink);
        }else{
            System.out.println("Drink with ID " + drink.getDrink_id() + " not found.");
        }
    }
}
