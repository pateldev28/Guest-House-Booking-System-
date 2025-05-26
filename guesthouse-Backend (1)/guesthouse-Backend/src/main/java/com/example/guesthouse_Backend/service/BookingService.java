package com.example.guesthouse_Backend.service;

import com.example.guesthouse_Backend.Dto.BookingRequestdto;
import com.example.guesthouse_Backend.Dto.BookingResponsedto;
import com.example.guesthouse_Backend.Entity.Booking;
import com.example.guesthouse_Backend.Entity.Booking.Status;
import com.example.guesthouse_Backend.Entity.Bed;
import com.example.guesthouse_Backend.Entity.Users;
import com.example.guesthouse_Backend.Repository.BookingRepository;
import com.example.guesthouse_Backend.Repository.BedRepository;
import com.example.guesthouse_Backend.Repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final BedRepository bedRepository;
    private final NotificationService notificationService;

    public BookingService(BookingRepository bookingRepository,
                          UserRepository userRepository,
                          BedRepository bedRepository,
                          NotificationService notificationService){
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.bedRepository = bedRepository;
        this.notificationService = notificationService;
    }

    public boolean isBedAvailable(Integer bedId, LocalDate startDate, LocalDate endDate) {
        List<Booking> conflicting = bookingRepository.findConflictingBookings(bedId, startDate, endDate);
        return conflicting.isEmpty();
    }

    @Transactional
    public BookingResponsedto bookBed(Integer userId, BookingRequestdto request) {
        Optional<Users> userOpt = userRepository.findById(userId);
        Optional<Bed> bedOpt = bedRepository.findById(request.getBedId());

        if (userOpt.isEmpty()) {
            return new BookingResponsedto(null, Status.CANCELLED.name(), "User not found");
        }
        if (bedOpt.isEmpty()) {
            return new BookingResponsedto(null, Status.CANCELLED.name(), "Bed not found");
        }

        LocalDate checkIn = request.getCheckInDate();
        LocalDate checkOut = request.getCheckOutDate();

        if (!isBedAvailable(request.getBedId(), checkIn, checkOut)) {
            return new BookingResponsedto(null, Status.CANCELLED.name(), "Bed is not available for the selected dates");
        }

        Booking booking = new Booking();
        booking.setUser(userOpt.get());
        booking.setBed(bedOpt.get());
        booking.setCheckInDate(checkIn);
        booking.setCheckOutDate(checkOut);
        booking.setStatus(Status.PENDING);

        Booking saved = bookingRepository.save(booking);

        notifyAdmin(saved);

        return new BookingResponsedto(saved.getId(), saved.getStatus().name(), "Booking created successfully");
    }

    @Transactional
    public BookingResponsedto cancelBooking(Integer userId, Integer bookingId) {
        Optional<Booking> bookingOpt = bookingRepository.findById(bookingId);
        if (bookingOpt.isEmpty()) {
            return new BookingResponsedto(null, Status.CANCELLED.name(), "Booking not found");
        }

        Booking booking = bookingOpt.get();
        if (booking.getUser().getId() != userId) {
            return new BookingResponsedto(null, booking.getStatus().name(), "Not authorized to cancel this booking");
        }

        if (booking.getStatus() != Status.PENDING) {
            return new BookingResponsedto(booking.getId(), booking.getStatus().name(),
                    "Cannot cancel booking unless it is pending");
        }

        booking.setStatus(Status.CANCELLED);
        bookingRepository.save(booking);

        return new BookingResponsedto(booking.getId(), booking.getStatus().name(), "Booking cancelled");
    }

    @Transactional
    public BookingResponsedto editBooking(Integer userId, Integer bookingId, BookingRequestdto request) {
        Optional<Booking> bookingOpt = bookingRepository.findById(bookingId);
        if (bookingOpt.isEmpty()) {
            return new BookingResponsedto(null, Status.CANCELLED.name(), "Booking not found");
        }

        Booking booking = bookingOpt.get();
        if (booking.getUser().getId() != userId) {
            return new BookingResponsedto(null, booking.getStatus().name(), "Not authorized to edit this booking");
        }

        if (booking.getStatus() != Status.PENDING) {
            return new BookingResponsedto(booking.getId(), booking.getStatus().name(),
                    "Cannot edit booking unless it is pending");
        }

        if (!isBedAvailable(request.getBedId(), request.getCheckInDate(), request.getCheckOutDate())) {
            return new BookingResponsedto(booking.getId(), booking.getStatus().name(),
                    "Bed is not available for the updated dates");
        }

        Optional<Bed> bedOpt = bedRepository.findById(request.getBedId());
        if (bedOpt.isEmpty()) {
            return new BookingResponsedto(booking.getId(), booking.getStatus().name(), "Bed not found");
        }

        booking.setBed(bedOpt.get());
        booking.setCheckInDate(request.getCheckInDate());
        booking.setCheckOutDate(request.getCheckOutDate());
        bookingRepository.save(booking);

        return new BookingResponsedto(booking.getId(), booking.getStatus().name(), "Booking updated");
    }

    private void notifyAdmin(Booking booking) {
        // For example, log a notification or send email here
        log.info("New booking created. Booking ID: {}, User: {}, Bed ID: {}",
                booking.getId(), booking.getUser().getUsername(), booking.getBed().getId());

//        Users adminUser = userRepository.findAdmin(); // Ensure this method exists in UserRepository
//        notificationService.notifyUser(adminUser, "New booking created: ID " + booking.getId(), "Booking Alert");
    }

    // Method to list all bookings with PENDING status
    public List<Booking> getPendingBookings() {
        return bookingRepository.findByStatus(Status.PENDING);
    }

    // Method to approve a booking by changing its status to CONFIRMED
    @Transactional
    public BookingResponsedto approveBooking(Integer bookingId) {
        Optional<Booking> bookingOpt = bookingRepository.findById(bookingId);
        if (bookingOpt.isEmpty()) {
            return new BookingResponsedto(null, Status.CANCELLED.name(), "Booking not found");
        }

        Booking booking = bookingOpt.get();

        if (booking.getStatus() != Status.PENDING) {
            return new BookingResponsedto(booking.getId(), booking.getStatus().name(),
                    "Only pending bookings can be approved.");
        }

        booking.setStatus(Status.CONFIRMED);
        bookingRepository.save(booking);

        return new BookingResponsedto(booking.getId(), booking.getStatus().name(), "Booking approved");
    }

    // Method to reject a booking by changing its status to REJECTED
    @Transactional
    public BookingResponsedto rejectBooking(Integer bookingId) {
        Optional<Booking> bookingOpt = bookingRepository.findById(bookingId);
        if (bookingOpt.isEmpty()) {
            return new BookingResponsedto(null, Status.CANCELLED.name(), "Booking not found");
        }

        Booking booking = bookingOpt.get();

        if (booking.getStatus() != Status.PENDING) {
            return new BookingResponsedto(booking.getId(), booking.getStatus().name(),
                    "Only pending bookings can be rejected.");
        }

        booking.setStatus(Status.REJECTED);
        bookingRepository.save(booking);

        return new BookingResponsedto(booking.getId(), booking.getStatus().name(), "Booking rejected");
    }
}
