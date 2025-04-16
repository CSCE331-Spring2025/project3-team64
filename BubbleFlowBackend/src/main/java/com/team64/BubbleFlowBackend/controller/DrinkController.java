package com.team64.BubbleFlowBackend.controller;

import com.team64.BubbleFlowBackend.model.Drink;
import com.team64.BubbleFlowBackend.model.DrinkRaw;
import com.team64.BubbleFlowBackend.service.DrinkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/drinks")
public class DrinkController {

    private DrinkService drinkService;

    @Autowired
    public DrinkController(DrinkService drinkService) {
        this.drinkService = drinkService;
    }

    @GetMapping
    public List<Drink> getAllDrinks() {
        return drinkService.getAllDrinks();
    }

    //Delete a drink by ID
    @PostMapping("/deleteDrink")
    public void deleteDrinkById(DrinkRaw drink) {
        System.out.println("Deleting drink: " + drink.getDrink_name() + " with ID: " + drink.getDrink_id());
        drinkService.deleteDrinkById(drink.getDrink_id());
    }

    //Add a drink
    @PostMapping("/addDrink")
    public void addDrink(Drink drink) {
        drinkService.addDrink(drink);
    }


    //modify drink
    @PostMapping("/updateDrink")
    public void updateDrink(Drink drink) {
        drinkService.updateDrink(drink);
    }
}

