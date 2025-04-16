package com.team64.BubbleFlowBackend.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.team64.BubbleFlowBackend.model.Drink;
import com.team64.BubbleFlowBackend.model.DrinkRaw;
import com.team64.BubbleFlowBackend.service.DrinkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.http.MediaType;


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
    @RequestMapping(value = "/deleteDrink", method = RequestMethod.POST)
    public void deleteDrinkById(@RequestBody JsonNode requestBody) {
        System.out.println("Deleting drink with ID: " + requestBody.get("drink_id").asInt());
        drinkService.deleteDrinkById(requestBody.get("drink_id").asInt());
    }

    //Add a drink
    @PostMapping("/addDrink")
    public void addDrink(Drink drink) {
        drinkService.addDrink(drink);
    }


    //modify drink
    @RequestMapping(value = "/updateDrink", method = RequestMethod.POST)
    public void updateDrink(@RequestBody JsonNode requestBody) {
        System.out.println("Updating drink with data: " + requestBody.toString());
        DrinkRaw drink = new DrinkRaw();
        drink.setDrink_id(requestBody.get("drink_id").asInt());
        drink.setDrink_name(requestBody.get("drink_name").asText());
        drink.setDrink_price(requestBody.get("drink_price").asDouble());
        drink.setDrink_category_name(requestBody.get("drink_category").get("drink_category_name").asText());
        //System.out.println("Drink name: " + drink.getDrink_category_name());
        drinkService.updateDrink(drink);
    }
}

