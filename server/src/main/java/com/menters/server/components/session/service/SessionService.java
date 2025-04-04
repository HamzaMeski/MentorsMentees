package com.menters.server.components.session.service;

import com.menters.server.components.session.dto.SessionRequestDTO;
import com.menters.server.components.session.dto.SessionResponseDTO;

import java.util.List;

public interface SessionService {
    SessionResponseDTO create(SessionRequestDTO requestDTO, Long mentorId);
    List<SessionResponseDTO> getMentorSessions(Long mentorId);
    List<SessionResponseDTO> getMenteeSessions(Long menteeId);
    void deleteSession(Long sessionId);
}
