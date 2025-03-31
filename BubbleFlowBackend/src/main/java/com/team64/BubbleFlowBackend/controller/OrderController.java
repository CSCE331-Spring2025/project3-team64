package com.team64.BubbleFlowBackend.controller;

import com.team64.BubbleFlowBackend.model.Order;
import com.team64.BubbleFlowBackend.model.OrderSubmissionObject;
import com.team64.BubbleFlowBackend.service.OrderService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private OrderService orderService;

    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        return orderService.createOrder(order);
    }

    @PostMapping("/submit")
    public Order submitOrder(@RequestBody OrderSubmissionObject orderSubmissionObject) {
        return orderService.submitOrder(orderSubmissionObject);
    }
}
