package com.menters.server.components.mentoring.mapper;

import com.menters.server.components.mentoring.dto.MentoringRequestDTO;
import com.menters.server.components.mentoring.dto.MentoringResponseDTO;
import com.menters.server.entities.Mentoring;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MentoringMapper {
    Mentoring toEntity(MentoringRequestDTO requestDTO);

    MentoringResponseDTO toResponse(Mentoring mentoring);
}
