package com.example.guesthouse_Backend.Repository;

import com.example.guesthouse_Backend.Entity.GuestHouse;
import com.example.guesthouse_Backend.Entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface RoomRepository extends JpaRepository<Room, Integer> {
}
