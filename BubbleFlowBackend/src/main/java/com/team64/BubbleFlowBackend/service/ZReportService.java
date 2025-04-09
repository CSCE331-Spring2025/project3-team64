// package com.team64.BubbleFlowBackend.service;

// import com.team64.BubbleFlowBackend.model.ZReport;
// import com.team64.BubbleFlowBackend.repository.ZReportRepo;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// @Service
// public class ZReportService {
//     private ZReportRepo zReportRepo;

//     @Autowired
//     public ZReportService(ZReportRepo zReportRepo) {
//         this.zReportRepo = zReportRepo;
//     }

//     public ZReport getReport() {
//         return zReportRepo.getReport(); // Assuming you want the first report
//     }
// }