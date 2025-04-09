// package com.team64.BubbleFlowBackend.controller;

// import com.team64.BubbleFlowBackend.model.ZReport;
// import com.team64.BubbleFlowBackend.service.ZReportService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import java.util.List;

// @RestController
// @RequestMapping("/zreport")
// // @CrossOrigin(origins = "*") // something abt. frontend & CORS access?
// public class ZReportController {

//     private ZReportService zReportService;

//     @Autowired
//     public ZReportController(ZReportService zReportService) {
//         this.zReportService = zReportService;
//     }

//     @GetMapping("/today-report")
//     public ZReport getZReport() {
//         return zReportService.getReport();
//     }
// }