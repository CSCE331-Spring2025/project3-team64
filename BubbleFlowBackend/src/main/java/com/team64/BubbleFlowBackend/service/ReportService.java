package com.team64.BubbleFlowBackend.service;

import com.team64.BubbleFlowBackend.model.Report;
import com.team64.BubbleFlowBackend.repository.ReportRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ReportService {

    @Autowired
    private ReportRepo reportRepo;

    public Report generateXReport() {
        return generateReportForDate(LocalDate.now(), "X_REPORT");
    }

    public Report generateXReportForDate(LocalDate date) {
        return generateReportForDate(date, "X_REPORT");
    }

    public Report generateZReportForDate(LocalDate date) {
        return generateReportForDate(date, "Z_REPORT");
    }

    public Report generateSalesReport(LocalDate starttime, LocalDate endtime) {
        Report report = new Report();
        report.setReportType("SALES_REPORT");
        report.setGeneratedAt(LocalDateTime.now());
        report.setStartReportDate(starttime); 
        report.setEndReportDate(endtime);

        List<Object[]> drinks = reportRepo.getTopSellingDrinks(starttime, endtime);
        List<Object[]> extras = reportRepo.getTopSellingExtras(starttime, endtime);

        List<Report.ItemSales> itemSales = new ArrayList<>();

        for (Object[] row : drinks) {
            Report.ItemSales item = new Report.ItemSales();
            item.setItemName((String) row[0]);
            item.setQuantitySold(((Number) row[1]).intValue());
            item.setTotalSales(((Number) row[2]).doubleValue());
            item.setCategory((String) row[3]);
            item.setType("Drinks");
            itemSales.add(item);   
        }

        for (Object[] row : extras) {
            Report.ItemSales item = new Report.ItemSales();
            item.setItemName((String) row[0]);
            item.setQuantitySold(((Number) row[1]).intValue());
            item.setTotalSales(((Number) row[2]).doubleValue());
            item.setCategory((String) row[3]);
            item.setType("Extras");
            itemSales.add(item);   
        }

        report.setItemSales(itemSales);
        return report;
    }

    private Report generateReportForDate(LocalDate date, String reportType) {
        Report report = new Report();
        report.setReportType(reportType);
        report.setGeneratedAt(LocalDateTime.now());
        report.setReportDate(date);

        List<Object[]> rawData = reportRepo.getReportDataByDate(date);
        List<Report.HourlySales> hourlySales = new ArrayList<>();

        for (Object[] row : rawData) {
            Report.HourlySales hourData = new Report.HourlySales();
            hourData.setHour(((Number) row[0]).intValue());
            hourData.setTransactionCount(((Number) row[1]).intValue());
            hourData.setTotalSales(((Number) row[2]).doubleValue());
            hourlySales.add(hourData);
        }

        report.setHourlySales(hourlySales);
        report.calculateTotals();

        return report;
    }
}