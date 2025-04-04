package com.menters.server.components.session.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record SessionRequestDTO(
        @NotNull(message = "mentorId is required")
        Long mentorId,

        @NotNull(message = "menteeId is required")
        Long menteeId,

        @NotBlank(message = "subject is required")
        String subject,

        @NotBlank(message = "session date is required")
        LocalDateTime sessionDate
) {}
