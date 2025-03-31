package com.team64.BubbleFlowBackend.service;

import com.team64.BubbleFlowBackend.model.DrinkCategory;
import com.team64.BubbleFlowBackend.repository.DrinkCategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DrinkCategoryService {

    @Autowired
    private DrinkCategoryRepo drinkCategoryRepo;

    public List<DrinkCategory> getAllDrinkCategories(){

        return drinkCategoryRepo.findAll();
    }
}
