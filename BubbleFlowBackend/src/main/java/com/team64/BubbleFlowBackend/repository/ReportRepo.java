package com.team64.BubbleFlowBackend.repository;

import com.team64.BubbleFlowBackend.model.Order;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public interface ReportRepo extends Repository<Order, Integer> {
    @Query(value = "SELECT EXTRACT(HOUR FROM o.order_date) AS hour, " +
            "COUNT(*) AS transaction_count, " +
            "SUM(o.order_total_price) AS total_sales " +
            "FROM Orders o " +
            "WHERE DATE(o.order_date) = :reportDate " +
            "GROUP BY EXTRACT(HOUR FROM o.order_date) " +
            "ORDER BY hour", nativeQuery = true)
    List<Object[]> getReportDataByDate(@Param("reportDate") LocalDate reportDate);

    @Query(value = "SELECT d.drink_name, COUNT(oi.drink_id) AS drink_count, SUM(d.drink_price) AS total_revenue, dc.drink_category_name AS category FROM order_items oi JOIN Drinks d ON oi.drink_id = d.drink_id JOIN Orders o ON oi.order_id = o.order_id JOIN Drink_Categories dc ON d.drink_category_id = dc.drink_category_id WHERE DATE(o.order_date) = CURRENT_DATE GROUP BY d.drink_id, d.drink_name, dc.drink_category_name ORDER BY drink_count DESC LIMIT 10", nativeQuery = true)
    
    List<Object[]> getTopSellingDrinks(
        @Param("starttime") LocalDate starttime,
        @Param("endtime") LocalDate endtime
    );

    // @Query(value = "SELECT e.extras_name, COUNT(oe.extras_id) AS extras_count, " +
    //             "SUM(e.extras_price) AS total_revenue, " +
    //             "ec.extra_category_name AS category " +
    //             "FROM order_extra oe " +
    //             "JOIN Toppings_Extras e ON oe.extras_id = e.extras_id " +
    //             "JOIN Orders o ON oe.order_id = o.order_id " +
    //             "JOIN Extras_Categories ec ON e.extra_category_id = ec.extra_category_id " +
    //             "WHERE DATE(o.order_date) = CURRENT_DATE " +
    //             "GROUP BY e.extras_id, e.extras_name, ec.extra_category_name " +
    //             "ORDER BY extras_count DESC " +
    //             "LIMIT 10", nativeQuery = true)
    // List<Object[]> getTopSellingExtras(
    //     @Param("starttime") LocalDate starttime,
    //     @Param("endtime") LocalDate endtime
    // );
}