package com.menters.server.components.mentoring.dto;

import jakarta.validation.constraints.NotNull;

public record MentoringRequestDTO(
        @NotNull(message = "menteeId is required")
        Long menteeId
) {}
