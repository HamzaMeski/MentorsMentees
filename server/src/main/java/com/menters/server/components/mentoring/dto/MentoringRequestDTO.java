package com.menters.server.components.mentoring.dto;

import jakarta.validation.constraints.NotNull;

public record MentoringRequestDTO(
        @NotNull(message = "mentorId is required")
        Long mentorId,

        @NotNull(message = "menteeId is required")
        Long menteeId
) {}
