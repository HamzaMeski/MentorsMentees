package com.menters.server.components.mentoring.service;

import com.menters.server.components.mentoring.dto.MentoringRequestDTO;
import com.menters.server.components.mentoring.dto.MentoringResponseDTO;

import java.util.List;

public interface MentoringService {
    MentoringResponseDTO create(MentoringRequestDTO requestDTO, Long mentorId);
    List<MentoringResponseDTO> getMenteesOfMentor(Long mentorId);
    List<MentoringResponseDTO> getMentorsOfMentee(Long menteeId);
    MentoringResponseDTO getMentoring(Long mentoringId);
    void delete(Long mentoringId);
}
