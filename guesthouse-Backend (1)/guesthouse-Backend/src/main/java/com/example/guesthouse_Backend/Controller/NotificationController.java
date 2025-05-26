package com.example.guesthouse_Backend.Controller;

import com.example.guesthouse_Backend.Entity.Notification;
import com.example.guesthouse_Backend.Entity.Users;
import com.example.guesthouse_Backend.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    // Endpoint to get notifications for the logged-in user
    @GetMapping
    public ResponseEntity<List<Notification>> getNotifications(@AuthenticationPrincipal Users user) {
        List<Notification> notifications = notificationService.getNotificationsForUser (user);
        return ResponseEntity.ok(notifications);
    }

    // Optional endpoint to mark a notification as read
    @PostMapping("/{id}/read")
    public ResponseEntity<Notification> markNotificationAsRead(@PathVariable("id") Integer notificationId, @AuthenticationPrincipal Users user) {
        Notification notification = notificationService.markNotificationAsRead(notificationId, user);
        return ResponseEntity.ok(notification);
    }
}
