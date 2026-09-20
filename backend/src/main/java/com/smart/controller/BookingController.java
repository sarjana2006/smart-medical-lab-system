package com.smart.controller;

import com.smart.entity.Booking;
import com.smart.service.BookingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/booking")
@CrossOrigin(origins = {"http://localhost:3000", "https://smart-medical-lab-system.vercel.app"})
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    // Create booking
    @PostMapping
    public ResponseEntity<Booking> createBooking(
            @RequestBody Booking booking) {

        Booking savedBooking = bookingService.createBooking(booking);

        return new ResponseEntity<>(
                savedBooking,
                HttpStatus.CREATED
        );
    }

    // Get all bookings
    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    // Get booking by ID
    @GetMapping("/{bookingId}")
    public Booking getBookingById(
            @PathVariable int bookingId) {

        return bookingService.getBookingById(bookingId);
    }

    // Get bookings of a patient
    @GetMapping("/patient/{patientId}")
    public List<Booking> getBookingsByPatient(
            @PathVariable int patientId) {

        return bookingService.getBookingsByPatient(patientId);
    }

    // Update booking
    @PutMapping("/{bookingId}")
    public Booking updateBooking(
            @PathVariable int bookingId,
            @RequestBody Booking booking) {

        return bookingService.updateBooking(bookingId, booking);
    }

    // Delete booking
    @DeleteMapping("/{bookingId}")
    public ResponseEntity<String> deleteBooking(
            @PathVariable int bookingId) {

        bookingService.deleteBooking(bookingId);

        return ResponseEntity.ok("Booking deleted successfully");
    }
}