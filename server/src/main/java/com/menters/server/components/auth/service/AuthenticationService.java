package com.menters.server.components.auth.service;

import com.menters.server.components.auth.dto.AuthenticationRequest;
import com.menters.server.components.auth.dto.AuthenticationResponse;
import com.menters.server.components.user.dto.UserResponseDTO;
import com.menters.server.components.auth.mapper.AuthMapper;
import com.menters.server.components.user.repository.UserRepository;
import com.menters.server.entities.User;
import com.menters.server.exception.AuthenticationException;
import com.menters.server.security.JwtService;
import com.menters.server.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final AuthMapper authMapper;

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        log.info("Attempting authentication for email: {}", request.getEmail());
        
        // Try to authenticate
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    request.getEmail(),
                    request.getPassword()
                )
            );
            log.info("Authentication successful for email: {}", request.getEmail());
        } catch (Exception e) {
            log.error("Authentication failed for email: {}", request.getEmail(), e);
            throw new AuthenticationException("Invalid email or password");
        }

        // Find user in appropriate repository
        return userRepository.findByEmail(request.getEmail())
                .map(user -> {
                    log.info("Building auth response for user: {}", user.getEmail());
                    return buildAuthResponse(user);
                })
                .orElseThrow(() -> {
                    log.error("No user found with email: {}", request.getEmail());
                    return new AuthenticationException("User not found");
                });
    }

    private AuthenticationResponse buildAuthResponse(User user) {
        String token = jwtService.generateToken(user.getEmail(), user.getId());
        return AuthenticationResponse.builder()
                .token(token)
                .userId(user.getId())
                .email(user.getEmail())
                .build();
    }

    public UserResponseDTO getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Long userId = userPrincipal.getId();


        User user = userRepository.findById(userId)
                .orElseThrow();
        return authMapper.toResponse(user);
    }
}
