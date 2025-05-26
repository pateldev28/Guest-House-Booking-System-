package com.example.guesthouse_Backend.Repository;

import com.example.guesthouse_Backend.Entity.Notification;
import com.example.guesthouse_Backend.Entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Integer>{

    // Find notifications by user ordered by latest first
    List<Notification> findByUserOrderByCreatedAtDesc(Users user);
}
