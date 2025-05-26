package com.example.guesthouse_Backend.service;

import com.example.guesthouse_Backend.Entity.Room;
import com.example.guesthouse_Backend.Repository.RoomRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class RoomService {

    private final RoomRepository roomRepository;

    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    public Room createRoom(Room room) {
        return roomRepository.save(room);
    }

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public Optional<Room> getRoomById(Integer id) {
        return roomRepository.findById(id);
    }

    public Room updateRoom(Integer id, Room updatedRoom) {
        return roomRepository.findById(id).map(existing -> {
            existing.setGuestHouse(updatedRoom.getGuestHouse());
            existing.setRoomNumber(updatedRoom.getRoomNumber());
            existing.setRoomType(updatedRoom.getRoomType());
            existing.setDescription(updatedRoom.getDescription());
            existing.setMaxOccupancy(updatedRoom.getMaxOccupancy());
            existing.setPrice(updatedRoom.getPrice());
            return roomRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Room not found"));
    }

    public void deleteRoom(Integer id) {
        roomRepository.deleteById(id);
    }
}
