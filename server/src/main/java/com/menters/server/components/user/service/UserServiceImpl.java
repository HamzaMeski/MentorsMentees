package com.menters.server.components.user.service;

import com.menters.server.components.user.dto.UserRequestDTO;
import com.menters.server.components.user.dto.UserResponseDTO;
import com.menters.server.components.user.mapper.UserMapper;
import com.menters.server.components.user.repository.ProfileRepository;
import com.menters.server.components.user.repository.UserRepository;
import com.menters.server.entities.Profile;
import com.menters.server.entities.User;
import com.menters.server.exception.DuplicateResourceException;
import com.menters.server.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService  {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final ProfileRepository profileRepository;

    @Override
    public UserResponseDTO register(UserRequestDTO requestDTO) {
        if(userRepository.existsByEmail(requestDTO.email())) {
            throw new DuplicateResourceException("Email already exists. ");
        }

        User user = userMapper.toUserEntity(requestDTO);
        user.setPassword(passwordEncoder.encode(requestDTO.password()));

        Profile profile = userMapper.toProfileEntity(requestDTO);
        profile.setUser(user);

        return  userMapper.toResponse(userRepository.save(user), profileRepository.save(profile));
    }

    @Override
    public UserResponseDTO getUser(Long id) {
        User user = findUserById(id);
        Profile profile = profileRepository.findById(user.getId())
                .orElseThrow();
        return userMapper.toResponse(user, profile);
    }

    @Override
    public void deleteUser(Long id) {
        User user = findUserById(id);
        userRepository.delete(user);
    }

    User findUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("user not found with that id."));
    }
}