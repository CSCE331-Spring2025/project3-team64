package com.team64.BubbleFlowBackend.repository;

import java.sql.ResultSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class GenerateID {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    /**
     * Generates a new employee ID
     * @return int representing new employee ID
     */
    public int employee(){
        String sql = "SELECT MAX(employee_id) FROM employees";
        int maxNum = jdbcTemplate.queryForObject(sql, int.class);
        return maxNum+1;
    }

    /**
     * Generates a new inventory ID
     * @return int representing new inventory ID
     */
    public int inventory(){
        String sql = "SELECT MAX(item_id) FROM inventory";
        int maxNum = jdbcTemplate.queryForObject(sql, int.class);
        return maxNum+1;
    }

    /**
     * Generates a new order ID
     * @return int representing a new order ID
     */
    public int order(){
        String sql = "SELECT MAX(order_id) FROM orders";
        int maxNum = jdbcTemplate.queryForObject(sql, int.class);
        return maxNum+1;
    }
    
    /**
     * Generates a new ingredient ID
     * @return int representing a new ingredient ID
     */
    public int ingredient(){
        String sql = "SELECT MAX(ingredient_id) FROM ingredients";
        int maxNum = jdbcTemplate.queryForObject(sql, int.class);
        return maxNum+1;
    }

    /**
     * Generates a new drink ID
     * @return int representing a new drink ID
     */
    public int drink(){
        String sql = "SELECT MAX(drink_id) FROM drinks";
        int maxNum = jdbcTemplate.queryForObject(sql, int.class);
        return maxNum+1;
    }

    /**
     * Generates a new drink category ID
     * @return int representing a new drink category ID
     */
    public int drink_category(){
        String sql = "SELECT MAX(drink_category_id) FROM drink_categories";
        int maxNum = jdbcTemplate.queryForObject(sql, int.class);
        return maxNum+1;
    }

    /**
     * Generates a new extra category ID
     * @return int representing a new extra category ID
     */
    public int extra_category(){
        String sql = "SELECT MAX(extra_category_id) FROM extra_categories";
        int maxNum = jdbcTemplate.queryForObject(sql, int.class);
        return maxNum+1;
    }

    /**
     * Generates a new order item ID
     * @return int representing a new order item ID
     */
    public int order_item(){
        String sql = "SELECT MAX(Order_Item_ID) FROM Order_Items";
        int maxNum = jdbcTemplate.queryForObject(sql, int.class);
        return maxNum+1;
    }
}