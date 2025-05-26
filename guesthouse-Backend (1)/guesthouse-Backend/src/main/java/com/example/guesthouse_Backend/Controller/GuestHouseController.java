package com.example.guesthouse_Backend.Controller;

import com.example.guesthouse_Backend.Entity.GuestHouse;
import com.example.guesthouse_Backend.service.GuestHouseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/guesthouses")
public class GuestHouseController {

    private final GuestHouseService guestHouseService;

    public GuestHouseController(GuestHouseService guestHouseService) {
        this.guestHouseService = guestHouseService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<GuestHouse> createGuestHouse(@RequestBody GuestHouse guestHouse) {
        GuestHouse created = guestHouseService.createGuestHouse(guestHouse);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<GuestHouse>> getAllGuestHouses(){
        return ResponseEntity.ok(guestHouseService.getAllGuestHouses());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<GuestHouse> getGuestHouseById(@PathVariable Integer id) {
        return guestHouseService.getGuestHouseById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<GuestHouse> updateGuestHouse(@PathVariable Integer id, @RequestBody GuestHouse guestHouse) {
        try {
            GuestHouse updated = guestHouseService.updateGuestHouse(id, guestHouse);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGuestHouse(@PathVariable Integer id) {
        guestHouseService.deleteGuestHouse(id);
        return ResponseEntity.noContent().build();
    }
}
