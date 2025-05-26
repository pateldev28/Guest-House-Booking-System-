package com.example.guesthouse_Backend.Repository;

import com.example.guesthouse_Backend.Entity.GuestHouse;
import com.example.guesthouse_Backend.Entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface RoleRepository extends JpaRepository<Role, Integer>{
}
