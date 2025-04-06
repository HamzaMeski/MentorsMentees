package com.menters.server.components.session.service;

import com.menters.server.components.session.dto.SessionRequestDTO;
import com.menters.server.components.session.dto.SessionResponseDTO;

import java.util.List;

public interface SessionService {
    SessionResponseDTO create(SessionRequestDTO requestDTO, Long mentorId);
    List<SessionResponseDTO> getMentorSessions(Long mentorId, Long menteeId);
    List<SessionResponseDTO> getMenteeSessions(Long menteeId, Long mentorId);
    void deleteSession(Long sessionId);
}
