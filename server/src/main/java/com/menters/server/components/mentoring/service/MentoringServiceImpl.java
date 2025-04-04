package com.menters.server.components.mentoring.service;

import com.menters.server.components.mentoring.dto.MentoringRequestDTO;
import com.menters.server.components.mentoring.dto.MentoringResponseDTO;
import com.menters.server.components.mentoring.mapper.MentoringMapper;
import com.menters.server.components.mentoring.repository.MentoringRepository;
import com.menters.server.components.user.repository.UserRepository;
import com.menters.server.entities.Mentoring;
import com.menters.server.entities.User;
import com.menters.server.exception.DuplicateResourceException;
import com.menters.server.exception.ResourceNotFoundException;
import com.menters.server.exception.ValidationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class MentoringServiceImpl implements MentoringService {

    private final MentoringRepository mentoringRepository;
    private final MentoringMapper mentoringMapper;
    private final UserRepository userRepository;

    @Override
    public MentoringResponseDTO create(MentoringRequestDTO requestDTO, Long mentorId) {
        if(mentoringRepository.isMentoringExists(mentorId, requestDTO.menteeId())) {
            throw new DuplicateResourceException("the mentee is already associated that mentor");
        }

        if(mentorId == requestDTO.menteeId()) {
            throw new ValidationException("the mentor can not mentor they selves");
        }

        User mentor = userRepository.findById(mentorId)
                .orElseThrow(() -> new ResourceNotFoundException("mentor doesn't found with id "+ mentorId));

        User mentee = userRepository.findById(requestDTO.menteeId())
                .orElseThrow(() -> new ResourceNotFoundException("mentee doesn't found with id "+ mentorId));

        Mentoring mentoring = mentoringMapper.toEntity(requestDTO);
        mentoring.setMentor(mentor);
        mentoring.setMentee(mentee);

        return mentoringMapper.toResponse(mentoringRepository.save(mentoring));
    }

    @Override
    public List<MentoringResponseDTO> getMenteesOfMentor(Long mentorId) {
        if(userRepository.existsById(mentorId)) {
            throw new ResourceNotFoundException("mentor doesn't found with id "+mentorId);
        }
        return mentoringRepository.getMenteesOfMentor(mentorId).stream()
                .map(mentoringMapper::toResponse)
                .toList();
    }

    @Override
    public List<MentoringResponseDTO> getMentorsOfMentee(Long menteeId) {
        if(userRepository.existsById(menteeId)) {
            throw new ResourceNotFoundException("mentee doesn't found with id "+menteeId);
        }

        return mentoringRepository.getMentorsOfMentee(menteeId).stream()
            .map(mentoringMapper::toResponse)
            .toList();
    }

    @Override
    public MentoringResponseDTO getMentoring(Long mentoringId) {
        Mentoring mentoring = mentoringRepository.findById(mentoringId)
                .orElseThrow(() -> new ResourceNotFoundException("mentoring doesn't found with id "+mentoringId));

        return mentoringMapper.toResponse(mentoring);
    }

    @Override
    public void delete(Long mentoringId) {
        Mentoring mentoring = mentoringRepository.findById(mentoringId)
                .orElseThrow(() -> new ResourceNotFoundException("mentoring doesn't found with id "+mentoringId));

        mentoringRepository.delete(mentoring);
    }
}
