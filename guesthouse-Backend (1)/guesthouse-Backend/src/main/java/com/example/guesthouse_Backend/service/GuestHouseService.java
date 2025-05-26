package com.example.guesthouse_Backend.service;

import com.example.guesthouse_Backend.Entity.GuestHouse;
import com.example.guesthouse_Backend.Repository.GuestHouseRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GuestHouseService {

private final GuestHouseRepository guestHouseRepository;

public GuestHouseService(GuestHouseRepository guestHouseRepository) {
    this.guestHouseRepository = guestHouseRepository;
    }

public GuestHouse createGuestHouse(GuestHouse guestHouse) {
    return guestHouseRepository.save(guestHouse);
    }

public List<GuestHouse> getAllGuestHouses() {
    return guestHouseRepository.findAll();
    }

public Optional<GuestHouse> getGuestHouseById(Integer id) {
    return guestHouseRepository.findById(id);
    }

public GuestHouse updateGuestHouse(Integer id, GuestHouse updatedGuestHouse) {
    return guestHouseRepository.findById(id).map(existing -> {
        existing.setName(updatedGuestHouse.getName());
        existing.setAddress(updatedGuestHouse.getAddress());
        // update other fields as needed
        return guestHouseRepository.save(existing);
    }).orElseThrow(() -> new RuntimeException("GuestHouse not found"));
}

public void deleteGuestHouse(Integer id) {
    guestHouseRepository.deleteById(id);
    }
}
