package com.smart.service;

import com.smart.entity.Booking;
import com.smart.entity.Report;
import com.smart.repository.BookingRepository;
import com.smart.repository.ReportRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReportService {

    private final BookingRepository bookingRepository;
    private final ReportRepository reportRepository;

    public ReportService(BookingRepository bookingRepository,
                         ReportRepository reportRepository) {
        this.bookingRepository = bookingRepository;
        this.reportRepository = reportRepository;
    }

    // Patient: Get reports by patient
    public List<Report> getReportsByPatientId(int patientId) {

        List<Booking> bookings = bookingRepository.findByPatientId(patientId);

        List<Report> reports = new ArrayList<>();

        for (Booking booking : bookings) {

            List<Report> bookingReports =
                    reportRepository.findByBookingId((long) booking.getBookingId());

            reports.addAll(bookingReports);
        }

        return reports;
    }

    // Admin: Get all reports
    public List<Report> getAllReports() {
        return reportRepository.findAll();
    }

    // Admin: Get report by ID
    public Report getReportById(Long reportId) {
        return reportRepository.findById(reportId)
                .orElseThrow(() -> new RuntimeException("Report not found"));
    }

    // Admin: Add report
    public Report addReport(Report report) {
        return reportRepository.save(report);
    }

    // Admin: Update report
    public Report updateReport(Long reportId, Report updatedReport) {

        Report existingReport = reportRepository.findById(reportId)
                .orElseThrow(() -> new RuntimeException("Report not found"));

        existingReport.setBookingId(updatedReport.getBookingId());
        existingReport.setReportDate(updatedReport.getReportDate());
        existingReport.setReportFile(updatedReport.getReportFile());
        existingReport.setReportStatus(updatedReport.getReportStatus());

        return reportRepository.save(existingReport);
    }

    // Admin: Delete report
    public void deleteReport(Long reportId) {

        if (!reportRepository.existsById(reportId)) {
            throw new RuntimeException("Report not found");
        }

        reportRepository.deleteById(reportId);
    }
}