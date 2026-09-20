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

    // Update booking
    public Booking updateBooking(int bookingId, Booking updatedBooking) {

        Booking existingBooking = bookingRepository.findById(bookingId)
                .orElseThrow(() ->
                    new RuntimeException("Booking not found"));

        existingBooking.setPatientId(updatedBooking.getPatientId());
        existingBooking.setLabId(updatedBooking.getLabId());
        existingBooking.setTestId(updatedBooking.getTestId());
        existingBooking.setBookingDate(updatedBooking.getBookingDate());
        existingBooking.setBookingTime(updatedBooking.getBookingTime());
        existingBooking.setCollectionType(updatedBooking.getCollectionType());
        existingBooking.setTechnicianName(updatedBooking.getTechnicianName());
        existingBooking.setBookingStatus(updatedBooking.getBookingStatus());
        existingBooking.setSampleStatus(updatedBooking.getSampleStatus());

        return bookingRepository.save(existingBooking);
    }

    // Delete booking
    public void deleteBooking(int bookingId) {

        if (!bookingRepository.existsById(bookingId)) {
            throw new RuntimeException("Booking not found");
        }

        bookingRepository.deleteById(bookingId);
    }
}