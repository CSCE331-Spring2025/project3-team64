package com.team64.BubbleFlowBackend.service;

import com.team64.BubbleFlowBackend.model.Extra;
import com.team64.BubbleFlowBackend.repository.ExtraRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExtraService {
    @Autowired
    private ExtraRepo extrasRepo;

    public List<Extra> getAllExtras() {
        return extrasRepo.findAll();
    }
}