package com.example.guesthouse_Backend.Dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequestdto {

    @NotBlank(message = "Username or Email is mandatory")
    private String username;

    @NotBlank(message = "Password is mandatory")
    private String password;
}

