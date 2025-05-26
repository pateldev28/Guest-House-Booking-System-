package com.example.guesthouse_Backend.Entity;

import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name = "beds")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Bed {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    @Column(nullable = false)
    private String bedNumber;

    private String bedType;

    private Boolean isAvailable = true;
}
