package com.team64.BubbleFlowBackend.controller;

import com.team64.BubbleFlowBackend.model.Extra;
import com.team64.BubbleFlowBackend.service.ExtraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/extras")
public class ExtrasController {
    @Autowired
    private ExtraService extrasService;

    @GetMapping
    public List<Extra> getAllExtras() {
        return extrasService.getAllExtras();
    }
}
