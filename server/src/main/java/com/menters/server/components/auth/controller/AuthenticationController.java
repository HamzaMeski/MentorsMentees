package com.menters.server.components.auth.controller;

import com.menters.server.components.auth.dto.AuthenticationRequest;
import com.menters.server.components.auth.dto.AuthenticationResponse;
import com.menters.server.components.auth.dto.UserResponseDTO;
import com.menters.server.components.auth.service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(
            @Valid @RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(service.authenticate(request));
    }

    @GetMapping("/authenticatedUser")
    public ResponseEntity<UserResponseDTO> getAuthenticatedUser() {
        return ResponseEntity.ok(service.getAuthenticatedUser());
    }
}
