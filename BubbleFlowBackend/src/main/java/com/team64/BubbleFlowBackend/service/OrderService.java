package com.team64.BubbleFlowBackend.service;

import com.team64.BubbleFlowBackend.model.Order;
import com.team64.BubbleFlowBackend.model.OrderSubmissionObject;
import com.team64.BubbleFlowBackend.repository.OrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.sql.Timestamp;

import java.util.List;

@Service

/*Order object attributes (Many of these aren't available from the front-end and need to be found in the database):
 * @Id
    private int order_id;                                                                   needs to be generated

    private String customer;                                                                from front-end
    private double order_total_price;                                                       from front-end
    private Timestamp order_date;                                                           needs to be generated    
    private int employee_id;                                                                from front-end but not implemented yet. Need one for self-service kiosk
    private String payment_method;                                                          from front-end

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items = new ArrayList<>();                                      from front-end, but we only have drink names. Also need to submit topping paired with drinks which this doesn't support.
 */

public class OrderService {
    @Autowired
    private OrderRepo orderRepo;

    public List<Order> getAllOrders(){
        return orderRepo.findAll();
    }

    public Order createOrder(Order order) {
        return orderRepo.save(order);
    }

    //Uses the orderSubmissionObject
    public Order submitOrder(OrderSubmissionObject orderSubmissionObject) {
        // Logic to process the order submission object and create an order from it
        Order order = new Order();

        // Generate the next available order ID in the database
        int orderId = orderRepo.findAll().size() + 1;
        order.setOrder_id(orderId);
        order.setOrder_total_price(orderSubmissionObject.getTotalPrice());
        order.setCustomer(orderSubmissionObject.getCustomerName());
        order.setEmployee_id(orderSubmissionObject.getEmployeeId());
        order.setPayment_method(orderSubmissionObject.getPaymentMethod());

        //generate timestamp for date
        order.setOrder_date(new Timestamp(System.currentTimeMillis()));
        
        orderRepo.save(order);

        return order;
    }

}
