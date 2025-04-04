package com.menters.server.components.session.mapper;

import com.menters.server.components.session.dto.SessionRequestDTO;
import com.menters.server.components.session.dto.SessionResponseDTO;
import com.menters.server.entities.Session;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface SessionMapper {
    Session toEntity(SessionRequestDTO requestDTO);

    @Mapping(target = "mentorId", source = "mentor.id")
    @Mapping(target = "menteeId", source = "mentee.id")
    SessionResponseDTO toResponse(Session session);
}
