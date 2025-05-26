package com.example.guesthouse_Backend.Repository;

import com.example.guesthouse_Backend.Entity.GuestHouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GuestHouseRepository extends JpaRepository<GuestHouse, Integer>{
}
