package com.smart.service;

import com.smart.entity.Booking;
import com.smart.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    // Create a new booking
    public Booking createBooking(Booking booking) {

        if (booking.getBookingStatus() == null ||
            booking.getBookingStatus().isEmpty()) {
            booking.setBookingStatus("CONFIRMED");
        }

        if (booking.getSampleStatus() == null ||
            booking.getSampleStatus().isEmpty()) {
            booking.setSampleStatus("BOOKING CONFIRMED");
        }

        return bookingRepository.save(booking);
    }

    // Get all bookings
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    // Get booking by ID
    public Booking getBookingById(int bookingId) {
        return bookingRepository.findById(bookingId)
                .orElseThrow(() ->
                    new RuntimeException("Booking not found"));
    }

    // Get bookings of a patient
    public List<Booking> getBookingsByPatient(int patientId) {
        return bookingRepository.findByPatientId(patientId);
    }
}