package com.menters.server.components.auth.dto;

import java.time.LocalDateTime;

public record UserInfoResponse(
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
