package com.smart.service;

import com.smart.entity.Booking;
import com.smart.entity.Report;
import com.smart.repository.BookingRepository;
import com.smart.repository.ReportRepository;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ReportServiceTest {

    @Mock
    private BookingRepository bookingRepository;

    @Mock
    private ReportRepository reportRepository;

    @InjectMocks
    private ReportService reportService;

    @org.junit.jupiter.api.Test
    void getReportsByPatientSuccessfully() {

        Booking booking = new Booking();
        booking.setBookingId(1);
        booking.setPatientId(1);

        Report report = new Report();
        report.setReportId(1L);
        report.setBookingId(1L);
        report.setReportStatus("AVAILABLE");

        when(bookingRepository.findByPatientId(1))
                .thenReturn(Arrays.asList(booking));

        when(reportRepository.findByBookingId(1L))
                .thenReturn(Arrays.asList(report));

        List<Report> result =
                reportService.getReportsByPatientId(1);

        assertEquals(1, result.size());
        assertEquals(1L, result.get(0).getReportId());
        assertEquals("AVAILABLE",
                result.get(0).getReportStatus());

        verify(bookingRepository)
                .findByPatientId(1);

        verify(reportRepository)
                .findByBookingId(1L);
    }

    @org.junit.jupiter.api.Test
    void getReportsByPatientWhenNoBookings() {

        when(bookingRepository.findByPatientId(99))
                .thenReturn(Arrays.asList());

        List<Report> result =
                reportService.getReportsByPatientId(99);

        assertTrue(result.isEmpty());

        verify(bookingRepository)
                .findByPatientId(99);

        verifyNoInteractions(reportRepository);
    }

    @org.junit.jupiter.api.Test
    void getAllReportsSuccessfully() {

        Report report1 = new Report();
        report1.setReportId(1L);

        Report report2 = new Report();
        report2.setReportId(2L);

        when(reportRepository.findAll())
                .thenReturn(Arrays.asList(
                        report1,
                        report2
                ));

        List<Report> result =
                reportService.getAllReports();

        assertEquals(2, result.size());
        assertEquals(1L,
                result.get(0).getReportId());
        assertEquals(2L,
                result.get(1).getReportId());

        verify(reportRepository).findAll();
    }

    @org.junit.jupiter.api.Test
    void getReportByIdSuccessfully() {

        Report report = new Report();
        report.setReportId(1L);
        report.setReportStatus("AVAILABLE");

        when(reportRepository.findById(1L))
                .thenReturn(Optional.of(report));

        Report result =
                reportService.getReportById(1L);

        assertNotNull(result);
        assertEquals(1L, result.getReportId());
        assertEquals("AVAILABLE",
                result.getReportStatus());

        verify(reportRepository).findById(1L);
    }

    @org.junit.jupiter.api.Test
    void getReportByIdWhenNotFound() {

        when(reportRepository.findById(99L))
                .thenReturn(Optional.empty());

        RuntimeException exception =
                assertThrows(
                        RuntimeException.class,
                        () -> reportService.getReportById(99L)
                );

        assertEquals(
                "Report not found",
                exception.getMessage()
        );

        verify(reportRepository).findById(99L);
    }

    @org.junit.jupiter.api.Test
    void addReportSuccessfully() {

        Report report = new Report();
        report.setBookingId(1L);
        report.setReportStatus("AVAILABLE");

        when(reportRepository.save(any(Report.class)))
                .thenAnswer(invocation ->
                        invocation.getArgument(0));

        Report result =
                reportService.addReport(report);

        assertNotNull(result);
        assertEquals(1L, result.getBookingId());
        assertEquals("AVAILABLE",
                result.getReportStatus());

        verify(reportRepository).save(report);
    }

    @org.junit.jupiter.api.Test
    void updateReportSuccessfully() {

        Report existingReport = new Report();
        existingReport.setReportId(1L);

        Report updatedReport = new Report();
        updatedReport.setBookingId(2L);
        updatedReport.setReportDate(
                LocalDateTime.of(2026, 9, 20, 10, 30)
        );
        updatedReport.setReportFile("report_002.pdf");
        updatedReport.setReportStatus("AVAILABLE");

        when(reportRepository.findById(1L))
                .thenReturn(Optional.of(existingReport));

        when(reportRepository.save(any(Report.class)))
                .thenAnswer(invocation ->
                        invocation.getArgument(0));

        Report result =
                reportService.updateReport(
                        1L,
                        updatedReport
                );

        assertNotNull(result);
        assertEquals(2L, result.getBookingId());
        assertEquals(
                "report_002.pdf",
                result.getReportFile()
        );
        assertEquals(
                "AVAILABLE",
                result.getReportStatus()
        );

        verify(reportRepository).findById(1L);
        verify(reportRepository).save(existingReport);
    }

    @org.junit.jupiter.api.Test
    void updateReportWhenNotFound() {

        Report updatedReport = new Report();

        when(reportRepository.findById(99L))
                .thenReturn(Optional.empty());

        RuntimeException exception =
                assertThrows(
                        RuntimeException.class,
                        () -> reportService.updateReport(
                                99L,
                                updatedReport
                        )
                );

        assertEquals(
                "Report not found",
                exception.getMessage()
        );

        verify(reportRepository).findById(99L);

        verify(reportRepository, never())
                .save(any(Report.class));
    }

    @org.junit.jupiter.api.Test
    void deleteReportSuccessfully() {

        when(reportRepository.existsById(1L))
                .thenReturn(true);

        doNothing()
                .when(reportRepository)
                .deleteById(1L);

        reportService.deleteReport(1L);

        verify(reportRepository)
                .existsById(1L);

        verify(reportRepository)
                .deleteById(1L);
    }

    @org.junit.jupiter.api.Test
    void deleteReportWhenNotFound() {

        when(reportRepository.existsById(99L))
                .thenReturn(false);

        RuntimeException exception =
                assertThrows(
                        RuntimeException.class,
                        () -> reportService.deleteReport(99L)
                );

        assertEquals(
                "Report not found",
                exception.getMessage()
        );

        verify(reportRepository)
                .existsById(99L);

        verify(reportRepository, never())
                .deleteById(99L);
    }
}