// package com.team64.BubbleFlowBackend.repository;

// import com.team64.BubbleFlowBackend.model.ZReport;
// import org.springframework.stereotype.Repository; // not sure
// import org.springframework.beans.factory.annotation.Autowired; // not sure
// import org.springframework.jdbc.core.JdbcTemplate; // not sure

// public interface ZReportRepo {
//     ZReport getTodayZReport(); 
// }


// @Repository
// class ReportRepoImp implements ZReportRepo {
    
//     @Autowired
//     private JdbcTemplate jdbcTemplate; 

//     @Override
//     public ZReport getTodayZReport() {

//         // Sales & Taxes Summary: Gross sales
//         String gross_sales_STS_sql = """
//             SELECT SUM(order_total_price) AS Gross_Sales FROM orders
//             where date(order_date) = CURRENT_DATE
//         """;
//         String gross_sales = jdbcTemplate.queryForObject(gross_sales_STS_sql, String.class);
//         gross_sales = gross_sales == null ? "0.00" : gross_sales; // if null

//         // Sales & Taxes Summary: Tax
//         String tax_STS_sql = """ 
//             select round(sum(order_total_price)*0.2, 2) as Tax from orders
//             where date(order_date) = CURRENT_DATE
//         """;
//         String tax = jdbcTemplate.queryForObject(tax_STS_sql, String.class);
//         tax = tax == null ? "0.00" : tax; // if null

//         // Sales & Taxes Summary: Total Net sales
//         String total_net_sales_STS_sql = """
//             select round(sum(order_total_price)*0.8, 2) as Total_Net_Sales from orders
//             where date(order_date) = CURRENT_DATE
//         """;
//         String total_net_sales = jdbcTemplate.queryForObject(total_net_sales_STS_sql, String.class);
//         total_net_sales = total_net_sales == null ? "0.00" : total_net_sales; // if null

//         ZReport report = new ZReport(
//             gross_sales, 
//             tax, 
//             total_net_sales
//         );
        
//         return report;
        
        
//         // return jdbcTemplate.queryForObject(sql, new Object[]{}, (rs, rowNum) -> {
//         //     ZReport zReport = new ZReport();
//         //     zReport.setId(rs.getInt("id"));
//         //     zReport.setDate(rs.getDate("date"));
//         //     zReport.setTotalSales(rs.getDouble("total_sales"));
//         //     return zReport;
//         // });
//     }
// }