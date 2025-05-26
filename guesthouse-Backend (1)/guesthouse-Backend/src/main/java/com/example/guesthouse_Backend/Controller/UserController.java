package com.example.guesthouse_Backend.Controller;

import com.example.guesthouse_Backend.Dto.LoginRequestdto;
import com.example.guesthouse_Backend.Dto.RegisterRequestdto;
import com.example.guesthouse_Backend.Entity.Users;
import com.example.guesthouse_Backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequestdto request) {
        try {
            Users user = userService.register(request);
            return ResponseEntity.ok("User registered successfully");
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestdto request) {
        try {
            Users user = userService.login(request);
            // If JWT is implemented, generate token here and return
            return ResponseEntity.ok("Login successful");
        } catch(IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
        }
    }
}

