package com.team64.BubbleFlowBackend.service;

import com.team64.BubbleFlowBackend.model.Drink;
import com.team64.BubbleFlowBackend.repository.DrinkRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DrinkService {
    @Autowired
    private DrinkRepo drinkRepo;

    public List<Drink> getAllDrinks (){
        return drinkRepo.findAll();
    }
}
