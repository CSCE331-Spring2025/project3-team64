package com.team64.BubbleFlowBackend.controller;

import com.team64.BubbleFlowBackend.model.Report;
import com.team64.BubbleFlowBackend.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/reports")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @GetMapping("/x-report")
    public Report getCurrentXReport() {
        return reportService.generateXReport();
    }

    @GetMapping("/x-report/date/{date}")
    public Report getXReportByDate(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return (reportService.generateXReportForDate(date));
    }

    // Sales report
    @GetMapping("/sales-report/date/{starttime}/{endtime}")
    public Report getSalesReport(
        @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate starttime,
        @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endtime
    ) {
        return (reportService.generateSalesReport(starttime, endtime));
        // return ResponseEntity.ok(report);
    }
}