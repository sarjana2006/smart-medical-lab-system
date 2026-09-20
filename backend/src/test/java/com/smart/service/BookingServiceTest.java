package com.smart.service;

import com.smart.entity.Booking;
import com.smart.repository.BookingRepository;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BookingServiceTest {

    @Mock
    private BookingRepository bookingRepository;

    @InjectMocks
    private BookingService bookingService;

    @org.junit.jupiter.api.Test
    void createBookingSuccessfully() {

        Booking booking = new Booking();

        booking.setPatientId(1);
        booking.setLabId(1);
        booking.setTestId(2);
        booking.setBookingDate(LocalDate.of(2026, 9, 20));
        booking.setBookingTime(LocalTime.of(10, 30));
        booking.setCollectionType("LAB VISIT");

        when(bookingRepository.save(any(Booking.class)))
                .thenAnswer(invocation ->
                        invocation.getArgument(0));

        Booking result =
                bookingService.createBooking(booking);

        assertNotNull(result);
        assertEquals("CONFIRMED",
                result.getBookingStatus());
        assertEquals("BOOKING CONFIRMED",
                result.getSampleStatus());

        verify(bookingRepository).save(booking);
    }

    @org.junit.jupiter.api.Test
    void createBookingKeepsExistingStatus() {

        Booking booking = new Booking();

        booking.setBookingStatus("PENDING");
        booking.setSampleStatus("SAMPLE COLLECTED");

        when(bookingRepository.save(any(Booking.class)))
                .thenAnswer(invocation ->
                        invocation.getArgument(0));

        Booking result =
                bookingService.createBooking(booking);

        assertEquals("PENDING",
                result.getBookingStatus());
        assertEquals("SAMPLE COLLECTED",
                result.getSampleStatus());

        verify(bookingRepository).save(booking);
    }

    @org.junit.jupiter.api.Test
    void getAllBookingsSuccessfully() {

        Booking booking1 = new Booking();
        booking1.setBookingId(1);

        Booking booking2 = new Booking();
        booking2.setBookingId(2);

        when(bookingRepository.findAll())
                .thenReturn(Arrays.asList(
                        booking1,
                        booking2
                ));

        List<Booking> result =
                bookingService.getAllBookings();

        assertEquals(2, result.size());
        assertEquals(1,
                result.get(0).getBookingId());
        assertEquals(2,
                result.get(1).getBookingId());

        verify(bookingRepository).findAll();
    }

    @org.junit.jupiter.api.Test
    void getBookingByIdSuccessfully() {

        Booking booking = new Booking();
        booking.setBookingId(1);
        booking.setPatientId(5);

        when(bookingRepository.findById(1))
                .thenReturn(Optional.of(booking));

        Booking result =
                bookingService.getBookingById(1);

        assertNotNull(result);
        assertEquals(1, result.getBookingId());
        assertEquals(5, result.getPatientId());

        verify(bookingRepository).findById(1);
    }

    @org.junit.jupiter.api.Test
    void getBookingByIdWhenNotFound() {

        when(bookingRepository.findById(99))
                .thenReturn(Optional.empty());

        RuntimeException exception =
                assertThrows(
                        RuntimeException.class,
                        () -> bookingService.getBookingById(99)
                );

        assertEquals(
                "Booking not found",
                exception.getMessage()
        );

        verify(bookingRepository).findById(99);
    }

    @org.junit.jupiter.api.Test
    void getBookingsByPatientSuccessfully() {

        Booking booking1 = new Booking();
        booking1.setBookingId(1);
        booking1.setPatientId(1);

        Booking booking2 = new Booking();
        booking2.setBookingId(2);
        booking2.setPatientId(1);

        when(bookingRepository.findByPatientId(1))
                .thenReturn(Arrays.asList(
                        booking1,
                        booking2
                ));

        List<Booking> result =
                bookingService.getBookingsByPatient(1);

        assertEquals(2, result.size());
        assertEquals(1,
                result.get(0).getPatientId());
        assertEquals(1,
                result.get(1).getPatientId());

        verify(bookingRepository)
                .findByPatientId(1);
    }

    @org.junit.jupiter.api.Test
    void updateBookingSuccessfully() {

        Booking existingBooking = new Booking();
        existingBooking.setBookingId(1);

        Booking updatedBooking = new Booking();

        updatedBooking.setPatientId(2);
        updatedBooking.setLabId(3);
        updatedBooking.setTestId(4);
        updatedBooking.setBookingDate(
                LocalDate.of(2026, 9, 25)
        );
        updatedBooking.setBookingTime(
                LocalTime.of(11, 30)
        );
        updatedBooking.setCollectionType(
                "HOME COLLECTION"
        );
        updatedBooking.setTechnicianName(
                "Technician 1"
        );
        updatedBooking.setBookingStatus(
                "CONFIRMED"
        );
        updatedBooking.setSampleStatus(
                "SAMPLE COLLECTED"
        );

        when(bookingRepository.findById(1))
                .thenReturn(Optional.of(existingBooking));

        when(bookingRepository.save(any(Booking.class)))
                .thenAnswer(invocation ->
                        invocation.getArgument(0));

        Booking result =
                bookingService.updateBooking(
                        1,
                        updatedBooking
                );

        assertNotNull(result);

        assertEquals(2,
                result.getPatientId());
        assertEquals(3,
                result.getLabId());
        assertEquals(4,
                result.getTestId());

        assertEquals(
                LocalDate.of(2026, 9, 25),
                result.getBookingDate()
        );

        assertEquals(
                LocalTime.of(11, 30),
                result.getBookingTime()
        );

        assertEquals(
                "HOME COLLECTION",
                result.getCollectionType()
        );

        assertEquals(
                "Technician 1",
                result.getTechnicianName()
        );

        assertEquals(
                "CONFIRMED",
                result.getBookingStatus()
        );

        assertEquals(
                "SAMPLE COLLECTED",
                result.getSampleStatus()
        );

        verify(bookingRepository).findById(1);
        verify(bookingRepository).save(existingBooking);
    }

    @org.junit.jupiter.api.Test
    void updateBookingWhenNotFound() {

        Booking updatedBooking = new Booking();

        when(bookingRepository.findById(99))
                .thenReturn(Optional.empty());

        RuntimeException exception =
                assertThrows(
                        RuntimeException.class,
                        () -> bookingService.updateBooking(
                                99,
                                updatedBooking
                        )
                );

        assertEquals(
                "Booking not found",
                exception.getMessage()
        );

        verify(bookingRepository).findById(99);

        verify(bookingRepository, never())
                .save(any(Booking.class));
    }

    @org.junit.jupiter.api.Test
    void deleteBookingSuccessfully() {

        when(bookingRepository.existsById(1))
                .thenReturn(true);

        doNothing()
                .when(bookingRepository)
                .deleteById(1);

        bookingService.deleteBooking(1);

        verify(bookingRepository)
                .existsById(1);

        verify(bookingRepository)
                .deleteById(1);
    }

    @org.junit.jupiter.api.Test
    void deleteBookingWhenNotFound() {

        when(bookingRepository.existsById(99))
                .thenReturn(false);

        RuntimeException exception =
                assertThrows(
                        RuntimeException.class,
                        () -> bookingService.deleteBooking(99)
                );

        assertEquals(
                "Booking not found",
                exception.getMessage()
        );

        verify(bookingRepository)
                .existsById(99);

        verify(bookingRepository, never())
                .deleteById(99);
    }
}