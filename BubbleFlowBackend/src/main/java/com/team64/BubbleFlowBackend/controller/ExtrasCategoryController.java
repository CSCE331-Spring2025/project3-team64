package com.team64.BubbleFlowBackend.controller;

import com.team64.BubbleFlowBackend.model.ExtrasCategory;
import com.team64.BubbleFlowBackend.service.ExtrasCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/extras-categories")
public class ExtrasCategoryController {
    @Autowired
    private ExtrasCategoryService extrasCategoryService;

    @GetMapping
    public List<ExtrasCategory> getAllExtrasCategories() {
        return extrasCategoryService.getAllExtrasCategories();
    }
}