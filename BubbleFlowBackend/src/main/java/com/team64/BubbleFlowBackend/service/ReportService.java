package com.team64.BubbleFlowBackend.service;

import com.team64.BubbleFlowBackend.model.Report;
import com.team64.BubbleFlowBackend.repository.ReportRepo;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ReportService {

    private final ReportRepo reportRepo;

    public ReportService(ReportRepo reportRepo) {
        this.reportRepo = reportRepo;
    }

    public Report generateXReport(){
        List<Object[]> rawData = reportRepo.getXReportData();
        return createReport("X_REPORT", LocalDate.now(), rawData);
    }

    private Report createReport(String reportType, LocalDate date, List<Object[]> rawData) {
        Report report = new Report();
        report.setReportType(reportType);
        report.setGeneratedAt(LocalDateTime.now());
        report.setReportDate(date);

        List<Report.HourlySales> hourlySalesData = new ArrayList<>();

        for (Object[] row : rawData) {
            Report.HourlySales hourData = new Report.HourlySales();
            hourData.setHour(((Number) row[0]).intValue());
            hourData.setTransactionCount(((Number) row[1]).intValue());
            hourData.setTotalSales(((Number) row[2]).doubleValue());
            hourlySalesData.add(hourData);
        }

        report.setHourlySales(hourlySalesData);
        report.calculateTotals();

        return report;
    }
}
