package com.example.backend.controller;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Email already in use");
            return ResponseEntity.badRequest().body(response);
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        Map<String, String> response = new HashMap<>();
        response.put("message", "User registered successfully");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        return userRepository.findByEmail(email)
                .map(user -> {
                    if (passwordEncoder.matches(password, user.getPassword())) {
                        Map<String, Object> response = new HashMap<>();
                        response.put("message", "Login successful");
                        Map<String, String> userData = new HashMap<>();
                        userData.put("name", user.getName());
                        userData.put("email", user.getEmail());
                        response.put("user", userData);
                        return ResponseEntity.ok(response);
                    }
                    Map<String, String> response = new HashMap<>();
                    response.put("message", "Invalid credentials");
                    return ResponseEntity.status(401).body((Object) response);
                })
                .orElseGet(() -> {
                    Map<String, String> response = new HashMap<>();
                    response.put("message", "Invalid credentials");
                    return ResponseEntity.status(401).body(response);
                });
    }
}
