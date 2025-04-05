package com.menters.server.components.mentoring.service;

import com.menters.server.components.mentoring.dto.MentoringRequestDTO;
import com.menters.server.components.mentoring.dto.MentoringResponseDTO;
import com.menters.server.components.mentoring.mapper.MentoringMapper;
import com.menters.server.components.mentoring.repository.MentoringRepository;
import com.menters.server.components.user.dto.UserResponseDTO;
import com.menters.server.components.user.mapper.UserMapper;
import com.menters.server.components.user.repository.ProfileRepository;
import com.menters.server.components.user.repository.UserRepository;
import com.menters.server.entities.Mentoring;
import com.menters.server.entities.Profile;
import com.menters.server.entities.User;
import com.menters.server.exception.DuplicateResourceException;
import com.menters.server.exception.ResourceNotFoundException;
import com.menters.server.exception.ValidationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class MentoringServiceImpl implements MentoringService {

    private final MentoringRepository mentoringRepository;
    private final MentoringMapper mentoringMapper;
    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final UserMapper userMapper;

    @Override
    public MentoringResponseDTO create(MentoringRequestDTO requestDTO, Long mentorId) {
        if(mentoringRepository.isMentoringExists(mentorId, requestDTO.menteeId())) {
            throw new DuplicateResourceException("the mentee is already associated to that mentor");
        }

        if(mentorId == requestDTO.menteeId()) {
            throw new ValidationException("the mentor can not mentor they selves");
        }

        User mentor = userRepository.findById(mentorId)
                .orElseThrow(() -> new ResourceNotFoundException("mentor doesn't found with id "+ mentorId));

        User mentee = userRepository.findById(requestDTO.menteeId())
                .orElseThrow(() -> new ResourceNotFoundException("user doesn't found with id "+ requestDTO.menteeId()));

        Mentoring mentoring = mentoringMapper.toEntity(requestDTO);
        mentoring.setMentor(mentor);
        mentoring.setMentee(mentee);

        return mentoringMapper.toResponse(mentoringRepository.save(mentoring));
    }

    @Override
    public List<UserResponseDTO> getMenteesOfMentor(Long mentorId) {
        if(!userRepository.existsById(mentorId)) {
            throw new ResourceNotFoundException("mentor doesn't found with id "+mentorId);
        }

        List<MentoringResponseDTO> mentoringResponseDTOs = mentoringRepository.getMenteesOfMentor(mentorId).stream()
                .map(mentoringMapper::toResponse)
                .toList();

        List<Long> menteeIds = mentoringResponseDTOs.stream()
                .map(MentoringResponseDTO::menteeId)
                .toList();

        List<User> users = userRepository.findAllByIdIn(menteeIds);
        List<Profile> profiles = profileRepository.findAllByUserIdIn(menteeIds);

        List<UserResponseDTO> response  = new ArrayList<>();
        for(int i = 0; i < users.size(); i++) {
            response.add(userMapper.toResponse(users.get(i), profiles.get(i)));
        }

        return response;
    }

    @Override
    public List<UserResponseDTO> getMentorsOfMentee(Long menteeId) {
        if(!userRepository.existsById(menteeId)) {
            throw new ResourceNotFoundException("mentee doesn't found with id "+menteeId);
        }

        List<MentoringResponseDTO> mentoringResponseDTOs =  mentoringRepository.getMentorsOfMentee(menteeId).stream()
                .map(mentoringMapper::toResponse)
                .toList();

        List<Long> menteeIds = mentoringResponseDTOs.stream()
                .map(MentoringResponseDTO::menteeId)
                .toList();

        List<User> users = userRepository.findAllByIdIn(menteeIds);
        List<Profile> profiles = profileRepository.findAllByUserIdIn(menteeIds);

        List<UserResponseDTO> response  = new ArrayList<>();
        for(int i = 0; i < users.size(); i++) {
            response.add(userMapper.toResponse(users.get(i), profiles.get(i)));
        }

        return response;
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
