package com.menters.server.components.user.dto;

import java.time.LocalDateTime;

public record UserResponseDTO(
        Long id,
        String email,
        String password,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {}
