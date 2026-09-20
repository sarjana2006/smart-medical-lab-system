package com.smart.controller;

import com.smart.entity.Report;
import com.smart.service.ReportService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/report")
@CrossOrigin(origins = {"http://localhost:3000", "https://smart-medical-lab-system.vercel.app"})
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    // Patient: Get reports
    @GetMapping("/patient/{patientId}")
    public List<Report> getReportsByPatient(
            @PathVariable int patientId) {

        return reportService.getReportsByPatientId(patientId);
    }

    // Admin: Get all reports
    @GetMapping
    public List<Report> getAllReports() {
        return reportService.getAllReports();
    }

    // Admin: Get report by ID
    @GetMapping("/{reportId}")
    public Report getReportById(@PathVariable Long reportId) {
        return reportService.getReportById(reportId);
    }

    // Admin: Add report
    @PostMapping
    public ResponseEntity<Report> addReport(
            @RequestBody Report report) {

        Report savedReport = reportService.addReport(report);

        return new ResponseEntity<>(
                savedReport,
                HttpStatus.CREATED
        );
    }

    // Admin: Update report
    @PutMapping("/{reportId}")
    public Report updateReport(
            @PathVariable Long reportId,
            @RequestBody Report report) {

        return reportService.updateReport(reportId, report);
    }

    // Admin: Delete report
    @DeleteMapping("/{reportId}")
    public ResponseEntity<String> deleteReport(
            @PathVariable Long reportId) {

        reportService.deleteReport(reportId);

        return ResponseEntity.ok(
                "Report deleted successfully"
        );
    }
}