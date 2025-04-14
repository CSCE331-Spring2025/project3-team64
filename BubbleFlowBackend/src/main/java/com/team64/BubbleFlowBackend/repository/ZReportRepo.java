package com.team64.BubbleFlowBackend.repository;

import com.team64.BubbleFlowBackend.model.ZReport;
import org.springframework.stereotype.Repository; // not sure
import org.springframework.beans.factory.annotation.Autowired; // not sure
import org.springframework.jdbc.core.JdbcTemplate; // not sure

import java.util.List;

public interface ZReportRepo {
    ZReport getTodayZReport(); 
}


@Repository
class ReportRepoImp implements ZReportRepo {
    
    @Autowired
    private JdbcTemplate jdbcTemplate; 

    @Override
    public ZReport getTodayZReport() {

        // Sales & Taxes Summary: Gross sales
        String gross_sales_STS_sql = """
            SELECT SUM(order_total_price) AS Gross_Sales FROM orders
            where date(order_date) = CURRENT_DATE
        """;
        String gross_sales = jdbcTemplate.queryForObject(gross_sales_STS_sql, String.class);
        gross_sales = gross_sales == null ? "0.00" : gross_sales; // if null


        // Sales & Taxes Summary: Tax
        String tax_STS_sql = """ 
            select ROUND(CAST(SUM(order_total_price) * 0.2 AS numeric), 2) as Tax from orders
            where date(order_date) = CURRENT_DATE
        """;
        String tax = jdbcTemplate.queryForObject(tax_STS_sql, String.class);
        tax = tax == null ? "0.00" : tax; // if null


        // Sales & Taxes Summary: Total Net sales
        String total_net_sales_STS_sql = """
            select ROUND(CAST(SUM(order_total_price) * 0.8 AS numeric), 2) as Total_Net_Sales from orders
            where date(order_date) = CURRENT_DATE
        """;
        String total_net_sales = jdbcTemplate.queryForObject(total_net_sales_STS_sql, String.class);
        total_net_sales = total_net_sales == null ? "0.00" : total_net_sales; // if null


        // Sales Categories
        String sales_categories_sql = """
            with 
                drink_id_cat_nam as (
                    select
                        Drinks.Drink_ID,
                        Drinks.Drink_Category_ID,
                        Drink_Categories.Drink_Category_NAME
                    from Drinks
                    join Drink_Categories
                        on  Drinks.Drink_Category_ID = Drink_Categories.Drink_Category_ID
                    group by Drinks.Drink_ID, Drinks.Drink_Category_ID, Drink_Categories.Drink_Category_NAME), 
                order_id_price as (
                    select
                        Order_items.Drink_ID,
                        Drinks.Drink_Price,
                        Order_items.Order_ID
                    from Order_items
                    join Drinks
                        on Order_items.Drink_ID = Drinks.Drink_ID
                    join Orders
                        on Order_items.Order_ID = Orders.Order_ID
                    where date(order_date) = CURRENT_DATE
                    group by
                        Order_items.Drink_ID,
                        Drinks.Drink_Price,
                        Order_items.Order_ID) 

            select 
                dicn.Drink_Category_NAME as Category,  
                count(dicn.Drink_Category_NAME) as Quantity,
                ROUND(CAST(sum(oip.Drink_Price) as numeric), 2) as Sales 
            from order_id_price oip 
            join drink_id_cat_nam dicn 
                on oip.Drink_ID = dicn.Drink_ID 
            group by Category
            order by Sales asc  
        """;
        List<ZReport.SalesCategory> sales_categories = jdbcTemplate.query(sales_categories_sql, (rs, rowNum) -> {
            return new ZReport.SalesCategory (
                rs.getString("Category"),
                rs.getInt("Quantity"),
                rs.getDouble("Sales")
            );
        });


        // Sales Categories: Total or Gross Sales
        String sales_categories_total_sql = """
            select
                sum(Drinks.Drink_Price) as Gross_sales
            from Order_items
            join Drinks
                on Order_items.Drink_ID = Drinks.Drink_ID
            join Orders
                on Order_items.Order_ID = Orders.Order_ID
            where date(order_date) = CURRENT_DATE;
        """;
        String sales_categories_total = jdbcTemplate.queryForObject(sales_categories_total_sql, String.class);
        sales_categories_total = sales_categories_total == null ? "0.00" : sales_categories_total; // if null


        // Payment details
        String payment_details_sql = """
            select 
                payment_method as Payment_type, 
                sum(order_total_price) as Amount 
            from orders 
            where date(order_date) = CURRENT_DATE
            group by Payment_type 
            order by Amount asc;  
        """;
        List<ZReport.PaymentMethod> payment_details = jdbcTemplate.query(payment_details_sql, (rs, rowNum) -> {
            return new ZReport.PaymentMethod (
                rs.getString("Payment_type"),
                rs.getDouble("Amount")
            );
        });

        // Total Payments
        String total_payments_sql = """
            select 
                sum(order_total_price) as Total_Amount 
            from orders
            where date(order_date) = CURRENT_DATE;
        """;
        String total_payments = jdbcTemplate.queryForObject(total_payments_sql, String.class);
        total_payments = total_payments == null ? "0.00" : total_payments; // if null

        
        // Create ZReport obj.
        ZReport report = new ZReport(
            gross_sales, 
            tax, 
            total_net_sales,
            sales_categories,
            sales_categories_total,
            payment_details,
            total_payments
        );
        
        return report;
    }
}