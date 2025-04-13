package com.team64.BubbleFlowBackend.model;

import jakarta.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({
    "reportType",
    "generatedAt",
    "reportDate",
    "gross_SALES",
    "tax",
    "total_NET_SALES",
    "salesCategories",
    "sales_CATEGORY_TOTAL",
    "paymentMethods",
    "total_PAYMENTS"
})

public class ZReport {
    private String GROSS_SALES;
    private String TAX;
    private String TOTAL_NET_SALES;
    private List<SalesCategory> salesCategories;
    private String SALES_CATEGORY_TOTAL;
    private List<PaymentMethod> paymentMethods; 
    private String TOTAL_PAYMENTS; // unsure

    private String reportType;
    private LocalDateTime generatedAt;
    private LocalDate reportDate;

    public ZReport(String GROSS_SALES, String TAX, String TOTAL_NET_SALES, List<SalesCategory> salesCategories, String SALES_CATEGORY_TOTAL, List<PaymentMethod> paymentMethods, String TOTAL_PAYMENTS) {
        this.GROSS_SALES = GROSS_SALES; 
        this.TAX = TAX; 
        this.TOTAL_NET_SALES = TOTAL_NET_SALES; 
        this.salesCategories = salesCategories; //== null ? new ArrayList<>() : salesCategories; // if null
        this.SALES_CATEGORY_TOTAL = SALES_CATEGORY_TOTAL;   
        this.paymentMethods = paymentMethods; //== null ? new ArrayList<>() : paymentMethods; // if null
        this.TOTAL_PAYMENTS = TOTAL_PAYMENTS; // unsure
    }

    public static class SalesCategory {
        private String Category;
        private int Quantity;
        private double Sales;

        public SalesCategory(String category, int quantity, double sales) {
            this.Category = category;
            this.Quantity = quantity;
            this.Sales = sales;
        }

        public String getCategory() { return Category;}
        public void setCategory(String category) { this.Category = category;}

        public int getQuantity() { return Quantity;}
        public void setQuantity(int quantity) { this.Quantity = quantity;}

        public double getSales() { return Sales;}
        public void setSales(double sales) { this.Sales = sales;}
    }

    public static class PaymentMethod {
        private String paymentMethod;
        private double amount;

        public PaymentMethod(String paymentMethod, double amount) {
            this.paymentMethod = paymentMethod;
            this.amount = amount;
        }

        public String getPaymentMethod() { return paymentMethod;}
        public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod;}

        public double getAmount() { return amount;}
        public void setAmount(double amount) { this.amount = amount;}
    }

    public String getReportType() { return reportType;}
    public void setReportType(String reportType) { this.reportType = reportType;}

    public LocalDateTime getGeneratedAt() { return generatedAt;}
    public void setGeneratedAt(LocalDateTime generatedAt) { this.generatedAt = generatedAt;}

    public LocalDate getReportDate() { return reportDate;}
    public void setReportDate(LocalDate reportDate) { this.reportDate = reportDate;}

    public String getGROSS_SALES() { return GROSS_SALES;}
    public void setGROSS_SALES(String GROSS_SALES) { this.GROSS_SALES = GROSS_SALES;}

    public String getTAX() { return TAX;}
    public void setTAX(String TAX) { this.TAX = TAX;}

    public String getTOTAL_NET_SALES() { return TOTAL_NET_SALES;}
    public void setTOTAL_NET_SALES(String TOTAL_NET_SALES) { this.TOTAL_NET_SALES = TOTAL_NET_SALES;}

    public List<SalesCategory> getSalesCategories() {
        return salesCategories == null ? new ArrayList<>() : salesCategories; // if null
    }
    public void setSalesCategories(List<SalesCategory> salesCategories) {
        this.salesCategories = salesCategories == null ? new ArrayList<>() : salesCategories; // if null
    }

    public String getSALES_CATEGORY_TOTAL() { return SALES_CATEGORY_TOTAL;}
    public void setSALES_CATEGORY_TOTAL(String SALES_CATEGORY_TOTAL) { this.SALES_CATEGORY_TOTAL = SALES_CATEGORY_TOTAL;}

    public List<PaymentMethod> getPaymentMethods() {
        return paymentMethods == null ? new ArrayList<>() : paymentMethods; // if null
    }
    public void setPaymentMethods(List<PaymentMethod> paymentMethods) {
        this.paymentMethods = paymentMethods == null ? new ArrayList<>() : paymentMethods; // if null
    }

    public String getTOTAL_PAYMENTS() { return TOTAL_PAYMENTS;}
    public void setTOTAL_PAYMENTS(String TOTAL_PAYMENTS) { this.TOTAL_PAYMENTS = TOTAL_PAYMENTS;}
}