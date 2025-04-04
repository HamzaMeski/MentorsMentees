package com.menters.server.components.mentoring.mapper;

import com.menters.server.components.mentoring.dto.MentoringRequestDTO;
import com.menters.server.components.mentoring.dto.MentoringResponseDTO;
import com.menters.server.entities.Mentoring;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MentoringMapper {
    Mentoring toEntity(MentoringRequestDTO requestDTO);

    @Mapping(target = "mentorId", source = "mentor.id")
    @Mapping(target = "menteeId", source = "mentee.id")
    MentoringResponseDTO toResponse(Mentoring mentoring);
}
