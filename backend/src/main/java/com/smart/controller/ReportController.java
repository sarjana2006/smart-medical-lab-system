package com.smart.controller;

import com.smart.entity.Report;
import com.smart.service.ReportService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/report")
@CrossOrigin(origins = "http://localhost:3000")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/patient/{patientId}")
    public List<Report> getReportsByPatient(
            @PathVariable int patientId) {

        return reportService.getReportsByPatientId(patientId);
    }
}