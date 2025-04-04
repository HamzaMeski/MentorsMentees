package com.menters.server.components.session.mapper;

import com.menters.server.components.session.dto.SessionRequestDTO;
import com.menters.server.components.session.dto.SessionResponseDTO;
import com.menters.server.entities.Session;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SessionMapper {
    Session toEntity(SessionRequestDTO requestDTO);
    SessionResponseDTO toResponse(Session session);
}
