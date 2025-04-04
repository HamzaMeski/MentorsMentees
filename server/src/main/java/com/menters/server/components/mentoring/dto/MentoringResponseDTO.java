package com.menters.server.components.mentoring.dto;

import java.time.LocalDateTime;

public record MentoringResponseDTO(
        Long mentorId,
        Long menteeId,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {}
