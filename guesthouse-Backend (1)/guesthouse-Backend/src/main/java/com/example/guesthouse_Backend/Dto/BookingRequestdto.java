package com.example.guesthouse_Backend.Dto;

import lombok.*;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingRequestdto {

    //This variable for the BookingRequest
    private Integer bedId;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;

}

