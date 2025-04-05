package com.menters.server.components.session.service;

import com.menters.server.components.session.dto.SessionRequestDTO;
import com.menters.server.components.session.dto.SessionResponseDTO;
import com.menters.server.components.session.mapper.SessionMapper;
import com.menters.server.components.session.repository.SessionRepository;
import com.menters.server.components.user.repository.UserRepository;
import com.menters.server.entities.Session;
import com.menters.server.entities.User;
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
    private final UserRepository userRepository;

    @Override
    public SessionResponseDTO create(SessionRequestDTO requestDTO, Long mentorId) {
        User mentor = userRepository.findById(mentorId)
                .orElseThrow(() -> new ResourceNotFoundException("mentor doesn't found with id "+ mentorId));

        User mentee = userRepository.findById(requestDTO.menteeId())
                .orElseThrow(() -> new ResourceNotFoundException("mentee doesn't found with id "+ mentorId));

        Session session = sessionMapper.toEntity(requestDTO);
        session.setMentor(mentor);
        session.setMentee(mentee);

        /*TODO: I will add condition that check the mentee is already associated to mentor*/

        return sessionMapper.toResponse(sessionRepository.save(session));
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
