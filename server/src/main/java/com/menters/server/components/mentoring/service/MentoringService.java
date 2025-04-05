package com.menters.server.components.mentoring.service;

import com.menters.server.components.mentoring.dto.MentoringRequestDTO;
import com.menters.server.components.mentoring.dto.MentoringResponseDTO;
import com.menters.server.components.user.dto.UserResponseDTO;

import java.util.List;

public interface MentoringService {
    MentoringResponseDTO create(MentoringRequestDTO requestDTO, Long mentorId);
    List<UserResponseDTO>getMenteesOfMentor(Long mentorId);
    List<UserResponseDTO> getMentorsOfMentee(Long menteeId);
    MentoringResponseDTO getMentoring(Long mentoringId);
    void delete(Long mentoringId);
}
