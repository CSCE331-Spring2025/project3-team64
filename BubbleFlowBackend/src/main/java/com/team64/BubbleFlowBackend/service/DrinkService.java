package com.team64.BubbleFlowBackend.service;

import com.team64.BubbleFlowBackend.model.Drink;
import com.team64.BubbleFlowBackend.repository.DrinkRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DrinkService {
    @Autowired
    private DrinkRepo drinkRepo;

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
    public void addDrink(Drink drink) {
        drinkRepo.save(drink);
    }


    //Update a drink
    public void updateDrink(Drink drink) {
        Drink existingDrink = drinkRepo.findById(drink.getDrink_id()).orElse(null);
        if (existingDrink != null) {
            existingDrink.setDrink_name(drink.getDrink_name());
            existingDrink.setDrink_price(drink.getDrink_price());
            existingDrink.setActive_months(drink.getActive_months());
            drinkRepo.save(existingDrink);
        }
    }
}
