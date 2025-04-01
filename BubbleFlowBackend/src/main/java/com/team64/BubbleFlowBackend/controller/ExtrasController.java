package com.team64.BubbleFlowBackend.controller;

import com.team64.BubbleFlowBackend.model.Extras;
import com.team64.BubbleFlowBackend.service.ExtrasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/extras")
public class ExtrasController {
    @Autowired
    private ExtrasService extrasService;

    @GetMapping
    public List<Extras> getAllExtras() {
        return extrasService.getAllExtras();
    }
}
