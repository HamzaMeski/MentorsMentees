package com.menters.server.entities;

import jakarta.persistence.*;

import java.time.LocalDateTime;

public class Session {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "mentor_id")
    private User mentor;

    @Column(name = "mentee_id")
    private User mentee;

    private String subject;

    private LocalDateTime sessionDate;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
