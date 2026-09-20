package com.smart.repository;

import com.smart.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Integer> {

    List<Booking> findByPatientId(int patientId);

    boolean existsByLabIdAndTestIdAndBookingDateAndBookingTime(
            int labId,
            int testId,
            LocalDate bookingDate,
            LocalTime bookingTime
    );
}