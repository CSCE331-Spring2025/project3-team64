package com.team64.BubbleFlowBackend.controller;

import com.team64.BubbleFlowBackend.model.Report;
import com.team64.BubbleFlowBackend.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/reports")
public class ReportController {
    @Autowired
    private ReportService reportService;

    @GetMapping("/x-report")
    public Report getXReport() {
        return reportService.generateXReport();
    }

}
