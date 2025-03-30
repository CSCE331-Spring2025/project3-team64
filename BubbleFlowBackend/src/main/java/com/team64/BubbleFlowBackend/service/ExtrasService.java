package com.team64.BubbleFlowBackend.service;

import com.team64.BubbleFlowBackend.model.Extras;
import com.team64.BubbleFlowBackend.repository.ExtrasRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExtrasService {
    @Autowired
    private ExtrasRepo extrasRepo;

    public List<Extras> getAllExtras() {
        return extrasRepo.findAll();
    }
}