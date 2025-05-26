package com.example.guesthouse_Backend.Repository;

import com.example.guesthouse_Backend.Entity.Booking;
import com.example.guesthouse_Backend.Entity.Booking.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Integer> {

    @Query("SELECT b FROM Booking b WHERE b.bed.id = :bedId AND b.status = 'CONFIRMED' " +
            "AND ((b.checkInDate <= :endDate AND b.checkOutDate >= :startDate))")
    List<Booking> findConflictingBookings(
            @Param("bedId") Integer bedId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    List<Booking> findByStatus(Status status);
}
