package com.team64.BubbleFlowBackend.model;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public class Report {

    private String reportType; // X_REPORT
    private LocalDateTime generatedAt;
    private LocalDate reportDate;

    // x, z report properties
    private List<HourlySales> hourlySales;
    private double totalSales;
    private int totalTransactions;

    // inner class for hourly sales data
    public static class HourlySales {
        private int hour;
        private int transactionCount;
        private double totalSales;

        public int getHour() {
            return hour;
        }

        public void setHour(int hour) {
            this.hour = hour;
        }

        public int getTransactionCount() {
            return transactionCount;
        }

        public void setTransactionCount(int transactionCount) {
            this.transactionCount = transactionCount;
        }

        public double getTotalSales() {
            return totalSales;
        }

        public void setTotalSales(double totalSales) {
            this.totalSales = totalSales;
        }
    }

    // Utility methods
    public void calculateTotals() {
        if (hourlySales == null) {
            this.totalSales = 0;
            this.totalTransactions = 0;
            return;
        }

        double sales = 0;
        int transactions = 0;

        for(HourlySales hourData : hourlySales){
            sales += hourData.getTotalSales();
            transactions += hourData.getTransactionCount();
        }

        this.totalSales = sales;
        this.totalTransactions = transactions;
    }

    public String getReportType() {
        return reportType;
    }

    public void setReportType(String reportType) {
        this.reportType = reportType;
    }

    public LocalDateTime getGeneratedAt() {
        return generatedAt;
    }

    public void setGeneratedAt(LocalDateTime generatedAt) {
        this.generatedAt = generatedAt;
    }

    public LocalDate getReportDate() {
        return reportDate;
    }

    public void setReportDate(LocalDate reportDate) {
        this.reportDate = reportDate;
    }

    public List<HourlySales> getHourlySales() {
        return hourlySales;
    }

    public void setHourlySales(List<HourlySales> hourlySales) {
        this.hourlySales = hourlySales;
    }

    public double getTotalSales() {
        return totalSales;
    }

    public void setTotalSales(double totalSales) {
        this.totalSales = totalSales;
    }

    public int getTotalTransactions() {
        return totalTransactions;
    }

    public void setTotalTransactions(int totalTransactions) {
        this.totalTransactions = totalTransactions;
    }
}