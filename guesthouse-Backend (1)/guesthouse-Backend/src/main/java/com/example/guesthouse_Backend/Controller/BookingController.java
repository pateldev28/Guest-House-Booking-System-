package com.example.guesthouse_Backend.Controller;

import com.example.guesthouse_Backend.Entity.Booking;
import com.example.guesthouse_Backend.Dto.BookingRequestdto;
import com.example.guesthouse_Backend.Dto.BookingResponsedto;
import com.example.guesthouse_Backend.service.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public ResponseEntity<BookingResponsedto> bookBed(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody BookingRequestdto request) {

        Integer userId = extractUserIdFromUserDetails(userDetails); // implement this method based on your auth setup

        BookingResponsedto response = bookingService.bookBed(userId, request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/availability")
    public ResponseEntity<Boolean> checkAvailability(
            @RequestParam Integer bedId,
            @RequestParam String checkInDate,
            @RequestParam String checkOutDate) {

        Boolean available = bookingService.isBedAvailable(bedId,
                LocalDate.parse(checkInDate), LocalDate.parse(checkOutDate));
        return ResponseEntity.ok(available);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookingResponsedto> editBooking(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Integer id,
            @RequestBody BookingRequestdto request) {
        Integer userId = extractUserIdFromUserDetails(userDetails); // implement this method based on your auth setup
        BookingResponsedto response = bookingService.editBooking(userId, id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<BookingResponsedto> cancelBooking(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Integer id) {
        Integer userId = extractUserIdFromUserDetails(userDetails); // implement this method based on your auth setup
        BookingResponsedto response = bookingService.cancelBooking(userId, id);
        return ResponseEntity.ok(response);
    }

    private Integer extractUserIdFromUserDetails(UserDetails userDetails) {
        // Implement this according to your UserDetails implementation
        // For example, cast userDetails and get the User ID
        // Or lookup user from username in DB if required
        return 1; // placeholder
    }

    // Endpoint to list all pending bookings (Admin only)
    @GetMapping("/pending")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Booking>> listPendingBookings() {
        List<Booking> pendingBookings = bookingService.getPendingBookings();
        return ResponseEntity.ok(pendingBookings);
    }

    // Endpoint to approve a pending booking (Admin only)
    @PostMapping("/{id}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BookingResponsedto> approveBooking(@PathVariable("id") Integer bookingId) {
        BookingResponsedto response = bookingService.approveBooking(bookingId);
        return ResponseEntity.ok(response);
    }

    // Endpoint to reject a pending booking (Admin only)
    @PostMapping("/{id}/reject")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BookingResponsedto> rejectBooking(@PathVariable("id") Integer bookingId) {
        BookingResponsedto response = bookingService.rejectBooking(bookingId);
        return ResponseEntity.ok(response);
    }

}
