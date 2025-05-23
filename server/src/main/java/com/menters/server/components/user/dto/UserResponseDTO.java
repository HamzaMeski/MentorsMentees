package com.menters.server.components.user.dto;

import java.time.LocalDateTime;

public record UserResponseDTO(
        Long id,
        String email,
        String password,
        String firstName,
        String lastName,
        String phone,
        String bio,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {}
