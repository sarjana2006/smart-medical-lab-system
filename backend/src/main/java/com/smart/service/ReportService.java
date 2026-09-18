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
}