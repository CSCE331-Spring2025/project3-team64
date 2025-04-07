package com.team64.BubbleFlowBackend.service;

import com.team64.BubbleFlowBackend.model.*;
import com.team64.BubbleFlowBackend.model.OrderSubmissionObject.DrinkWithToppings;
import com.team64.BubbleFlowBackend.repository.ExtraRepo;
import com.team64.BubbleFlowBackend.repository.OrderRepo;
import com.team64.BubbleFlowBackend.repository.OrderItemRepo;
import com.team64.BubbleFlowBackend.repository.OrderExtraRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {
    private final OrderRepo orderRepo;
    private final OrderItemRepo orderItemRepo;
    private final OrderExtraRepo orderExtraRepo;
    private final ExtraRepo extraRepo;

    @Autowired
    public OrderService(OrderRepo orderRepo, OrderItemRepo orderItemRepo, OrderExtraRepo orderExtraRepo, ExtraRepo extraRepo) {
        this.orderRepo = orderRepo;
        this.orderItemRepo = orderItemRepo;
        this.orderExtraRepo = orderExtraRepo;
        this.extraRepo = extraRepo;
    }

    public List<Order> getAllOrders(){
        return orderRepo.findAll();
    }

    public Order createOrder(Order order) {
        return orderRepo.save(order);
    }

    @Transactional
    public Order submitOrder(OrderSubmissionObject orderSubmissionObject) {
        // Create and populate the order
        System.out.println(orderSubmissionObject);

        Order order = new Order();
        order.setOrder_total_price(orderSubmissionObject.getTotalPrice());
        order.setCustomer(orderSubmissionObject.getCustomerName());
        order.setEmployee_id(orderSubmissionObject.getEmployeeId());
        order.setPayment_method(orderSubmissionObject.getPaymentMethod());
        order.setOrder_date(new Timestamp(System.currentTimeMillis()));

        // Save the order first to get its ID
        order = orderRepo.save(order);

        // Process drinks and add them to the order
        List<DrinkWithToppings> drinks = orderSubmissionObject.getDrinks();
        if (drinks != null) {
            for (DrinkWithToppings item : drinks) {
                OrderItem orderItem = new OrderItem();
                orderItem.setDrinkId(item.getDrink_id());
                orderItem.setOrder(order);
                orderItem.setOrderId(order.getOrder_id()); // Ensure order_id is set

                // Save the order item to get its ID
                orderItem = orderItemRepo.save(orderItem);

                // Process toppings
                List<OrderExtra> extras = new ArrayList<>();
                for (int toppingID : item.getToppings()) {
                    // Get the Extra entity
                    Extra extra = extraRepo.findById(toppingID)
                            .orElseThrow(() -> new RuntimeException("Extra not found with id: " + toppingID));

                    // Create composite key
                    OrderExtraId orderExtraId = new OrderExtraId();

                    // Create OrderExtra and set relationships
                    OrderExtra orderExtra = new OrderExtra();
                    orderExtra.setId(orderExtraId);
                    orderExtra.setOrderItem(orderItem);
                    orderExtra.setExtra(extra);

                    extras.add(orderExtraRepo.save(orderExtra));
                }

                orderItem.setExtras(extras);
                orderItemRepo.save(orderItem);
            }
        }

        // Fetch the complete order with all its items and extras
        return orderRepo.findById(order.getOrder_id()).orElse(order);
    }

    @Transactional
    public OrderItem addExtraToOrderItem(int orderItemId, int extraId) {
        OrderItem orderItem = orderItemRepo.findById(orderItemId)
                .orElseThrow(() -> new RuntimeException("Order item not found with id: " + orderItemId));

        Extra extra = extraRepo.findById(extraId)
                .orElseThrow(() -> new RuntimeException("Extra not found with id: " + extraId));

        // Create composite key
        OrderExtraId orderExtraId = new OrderExtraId();

        // Create and save the new order extra
        OrderExtra orderExtra = new OrderExtra();
        orderExtra.setId(orderExtraId);
        orderExtra.setOrderItem(orderItem);
        orderExtra.setExtra(extra);

        orderExtraRepo.save(orderExtra);

        // Return the updated order item
        return orderItemRepo.findById(orderItemId).orElse(null);
    }

    public List<OrderExtra> getExtrasForOrderItem(int orderItemId) {
        return orderExtraRepo.findByOrderItemId(orderItemId);
    }
}