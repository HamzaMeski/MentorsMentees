package com.menters.server.components.session.dto;

import java.time.LocalDateTime;

public record SessionResponseDTO(
        Long id,
        Long mentorId,
        Long menteeId,
        String subject,
        LocalDateTime sessionDate,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {}
