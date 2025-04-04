package com.menters.server.components.user.mapper;

import com.menters.server.components.user.dto.UserRequestDTO;
import com.menters.server.components.user.dto.UserResponseDTO;
import com.menters.server.entities.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toEntity(UserRequestDTO requestDTO);

    UserResponseDTO toResponse(User user);
}
