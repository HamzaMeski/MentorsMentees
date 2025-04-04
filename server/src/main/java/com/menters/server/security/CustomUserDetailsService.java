package com.menters.server.security;

import com.menters.server.components.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        log.info("Attempting to load user by email: {}", email);
        
        // Try to find user in admin table
        return userRepository.findByEmail(email)
                .map(admin -> {
                    log.info("Found admin user: {}", admin.getEmail());
                    return UserPrincipal.builder()
                            .id(admin.getId())
                            .email(admin.getEmail())
                            .password(admin.getPassword())
                            .build();
                })
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
}
