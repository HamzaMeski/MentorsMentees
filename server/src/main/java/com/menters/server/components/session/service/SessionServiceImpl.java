package com.menters.server.components.session.service;

import com.menters.server.components.session.dto.SessionRequestDTO;
import com.menters.server.components.session.dto.SessionResponseDTO;
import com.menters.server.components.session.mapper.SessionMapper;
import com.menters.server.components.session.repository.SessionRepository;
import com.menters.server.entities.Session;
import com.menters.server.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class SessionServiceImpl implements SessionService {
    private final SessionRepository sessionRepository;
    private final SessionMapper sessionMapper;

    @Override
    public SessionResponseDTO create(SessionRequestDTO requestDTO) {
        return sessionMapper.toResponse(sessionRepository.save(sessionMapper.toEntity(requestDTO)));
    }

    @Override
    public List<SessionResponseDTO> getMentorSessions(Long mentorId) {
        return sessionRepository.getMentorSessions(mentorId).stream()
                .map(sessionMapper::toResponse)
                .toList();
    }

    @Override
    public List<SessionResponseDTO> getMenteeSessions(Long menteeId) {
        return sessionRepository.getMenteeSessions(menteeId).stream()
                .map(sessionMapper::toResponse)
                .toList();
    }

    @Override
    public void deleteSession(Long sessionId) {
        Session session = sessionRepository.findById(sessionId)
                        .orElseThrow(() -> new ResourceNotFoundException("session doesn't found with id "+sessionId));

        sessionRepository.delete(session);
    }
}
