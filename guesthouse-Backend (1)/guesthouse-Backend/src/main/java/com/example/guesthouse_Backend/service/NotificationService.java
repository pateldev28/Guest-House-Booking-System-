package com.example.guesthouse_Backend.service;

import com.example.guesthouse_Backend.Entity.Notification;
import com.example.guesthouse_Backend.Entity.Users;
import com.example.guesthouse_Backend.Repository.NotificationRepository;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final EmailService emailService;

    public void notifyUser(Users user, String message, String emailSubject) {
        // Save notification record in the database
        Notification notification = new Notification();
        notification.setUser(user);
        notification.setMessage(message);
        notification.setIsRead(false);
        notification.setCreatedAt(LocalDateTime.now());
        notificationRepository.save(notification);

        // Send email alert
        try {
            emailService.sendEmail(user.getEmail(), emailSubject, message);
        } catch (MessagingException e) {
            e.printStackTrace();
            // Optionally log or handle email failure
        }
    }

    // In NotificationService.java
    public List<Notification> getNotificationsForUser (Users user) {
        return notificationRepository.findByUserOrderByCreatedAtDesc(user);
    }

    public Notification markNotificationAsRead(Integer notificationId, Users user) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new IllegalArgumentException("Notification not found"));

        if (notification.getUser() == null || notification.getUser().getId() != user.getId()) {
            throw new IllegalArgumentException("You are not authorized to update this notification");
        }

        notification.setIsRead(true);
        return notificationRepository.save(notification);
    }

}
