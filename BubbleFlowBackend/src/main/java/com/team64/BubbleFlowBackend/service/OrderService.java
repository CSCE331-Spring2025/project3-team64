package com.team64.BubbleFlowBackend.service;

import com.team64.BubbleFlowBackend.model.Order;
import com.team64.BubbleFlowBackend.repository.OrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderRepo orderRepo;

    public List<Order> getAllOrders(){
        return orderRepo.findAll();
    }

}
