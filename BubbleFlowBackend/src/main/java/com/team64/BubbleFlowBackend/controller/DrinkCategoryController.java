package com.team64.BubbleFlowBackend.controller;

import com.team64.BubbleFlowBackend.model.DrinkCategory;
import com.team64.BubbleFlowBackend.service.DrinkCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/drink-categories")
public class DrinkCategoryController {

    @Autowired
    private DrinkCategoryService drinkCategoryService;


    @GetMapping
    public List<DrinkCategory> getAllDrinkCategories(){
        return drinkCategoryService.getAllDrinkCategories();
    }
}
