package com.team64.BubbleFlowBackend.service;

import com.team64.BubbleFlowBackend.model.ExtrasCategory;
import com.team64.BubbleFlowBackend.repository.ExtrasCategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExtrasCategoryService {
    @Autowired
    private ExtrasCategoryRepo extrasCategoryRepo;

    public List<ExtrasCategory> getAllExtrasCategories() {
        return extrasCategoryRepo.findAll();
    }
}