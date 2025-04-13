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

}