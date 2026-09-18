package com.smart.repository;

import com.smart.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Long> {

    List<Report> findByBookingId(Long bookingId);
}