package com.menters.server.components.user.service;

import com.menters.server.components.user.dto.UserRequestDTO;
import com.menters.server.components.user.dto.UserResponseDTO;

public interface UserService {
    UserResponseDTO register(UserRequestDTO requestDTO);
    UserResponseDTO getUser(Long id);
    void deleteUser(Long id);
}
