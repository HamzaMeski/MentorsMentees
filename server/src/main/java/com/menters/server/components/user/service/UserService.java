package com.menters.server.components.user.service;

import com.menters.server.components.user.dto.RegisterUserDTO;
import com.menters.server.components.user.dto.UpdateUserDTO;
import com.menters.server.components.user.dto.UserResponseDTO;

public interface UserService {
    UserResponseDTO register(RegisterUserDTO requestDTO);
    UserResponseDTO getUser(Long id);
    UserResponseDTO update(UpdateUserDTO requestDTO, Long id);
    void deleteUser(Long id);
}
