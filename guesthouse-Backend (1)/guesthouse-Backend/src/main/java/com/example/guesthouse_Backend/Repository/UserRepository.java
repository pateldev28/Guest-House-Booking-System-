package com.example.guesthouse_Backend.Repository;

import java.util.List;
import java.util.Optional;

import com.example.guesthouse_Backend.Entity.Notification;
import com.example.guesthouse_Backend.Entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<Users, Integer> {
    Optional<Users> findByUsername(String username);
    Optional<Users> findByEmail(String email);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);



//    @Query("SELECT u FROM Users u WHERE u.role = 'ADMIN'") // Adjust role name if needed
//    Users findAdmin();
}
