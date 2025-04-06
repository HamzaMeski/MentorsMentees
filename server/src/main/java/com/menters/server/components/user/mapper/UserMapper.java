package com.menters.server.components.user.mapper;

import com.menters.server.components.user.dto.RegisterUserDTO;
import com.menters.server.components.user.dto.UserResponseDTO;
import com.menters.server.entities.Profile;
import com.menters.server.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "email", source = "requestDTO.email")
    @Mapping(target = "password", source = "requestDTO.password")
    User toUserEntity(RegisterUserDTO requestDTO);

    @Mapping(target = "firstName", source = "requestDTO.firstName")
    @Mapping(target = "lastName", source = "requestDTO.lastName")
    @Mapping(target = "phone", source = "requestDTO.phone")
    @Mapping(target = "bio", source = "requestDTO.bio")
    Profile toProfileEntity(RegisterUserDTO requestDTO);

    @Mapping(target = "id", source = "user.id")
    @Mapping(target = "email", source = "user.email")
    @Mapping(target = "password", source = "user.password")
    @Mapping(target = "firstName", source = "profile.firstName")
    @Mapping(target = "lastName", source = "profile.lastName")
    @Mapping(target = "phone", source = "profile.phone")
    @Mapping(target = "bio", source = "profile.bio")
    @Mapping(target = "createdAt", source = "profile.createdAt")
    @Mapping(target = "updatedAt", source = "profile.updatedAt")
    UserResponseDTO toResponse(User user, Profile profile);
}
