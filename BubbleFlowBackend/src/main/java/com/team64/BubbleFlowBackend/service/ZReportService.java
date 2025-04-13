package com.team64.BubbleFlowBackend.service;

import com.team64.BubbleFlowBackend.model.ZReport;
import com.team64.BubbleFlowBackend.repository.ZReportRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ZReportService {
    private ZReportRepo zReportRepo;

    @Autowired
    public ZReportService(ZReportRepo zReportRepo) {
        this.zReportRepo = zReportRepo;
    }

    public ZReport generateZReport() {
        ZReport zreport = zReportRepo.getTodayZReport();

        // List<ZReport.SalesCategory> salesCategories = new zReportRepo().getSalesCategories();
        // zReport.setSalesCategories(salesCategories);
       
        zreport.setReportType("Z_REPORT");
        zreport.setGeneratedAt(java.time.LocalDateTime.now());
        zreport.setReportDate(java.time.LocalDate.now());

        return zreport;
    }
    
}