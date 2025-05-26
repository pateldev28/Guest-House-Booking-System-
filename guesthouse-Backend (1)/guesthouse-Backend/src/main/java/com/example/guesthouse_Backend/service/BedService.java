package com.example.guesthouse_Backend.service;

import com.example.guesthouse_Backend.Entity.Bed;
import com.example.guesthouse_Backend.Repository.BedRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class BedService {

    private final BedRepository bedRepository;

    public BedService(BedRepository bedRepository) {
        this.bedRepository = bedRepository;
    }

    public Bed createBed(Bed bed) {
        return bedRepository.save(bed);
    }

    public List<Bed> getAllBeds() {
        return bedRepository.findAll();
    }

    public Optional<Bed> getBedById(Integer id) {
        return bedRepository.findById(id);
    }

    public Bed updateBed(Integer id, Bed updatedBed) {
        return bedRepository.findById(id).map(existing -> {
            existing.setRoom(updatedBed.getRoom());
            existing.setBedNumber(updatedBed.getBedNumber());
            existing.setBedType(updatedBed.getBedType());
            existing.setIsAvailable(updatedBed.getIsAvailable());
            return bedRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Bed not found"));
    }

    public void deleteBed(Integer id) {
        bedRepository.deleteById(id);
    }
}

