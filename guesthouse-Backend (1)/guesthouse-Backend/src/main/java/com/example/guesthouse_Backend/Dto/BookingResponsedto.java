package com.example.guesthouse_Backend.Dto;

import lombok.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingResponsedto {
    private Integer bookingId;
    private String status;
    private String message;
}
