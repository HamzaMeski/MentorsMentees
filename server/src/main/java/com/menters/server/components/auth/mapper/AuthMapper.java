package com.menters.server.components.auth.mapper;

import com.menters.server.components.user.dto.UserResponseDTO;

import com.menters.server.entities.User;
import org.mapstruct.Mapper;


@Mapper(componentModel = "spring")
public interface AuthMapper {
    UserResponseDTO toResponse(User user);
}
