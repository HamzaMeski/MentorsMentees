package com.menters.server.components.user.controller;

import com.menters.server.components.user.dto.RegisterUserDTO;
import com.menters.server.components.user.dto.UpdateUserDTO;
import com.menters.server.components.user.dto.UserResponseDTO;
import com.menters.server.components.user.service.UserService;
import com.menters.server.security.CurrentUser;
import com.menters.server.security.UserPrincipal;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
public class UserController {
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> register(
            @Valid @RequestBody RegisterUserDTO requestDTO
    ) {
        return new ResponseEntity<>(userService.register(requestDTO), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUser(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(userService.getUser(id));
    }

    @PutMapping()
    public ResponseEntity<UserResponseDTO> update(
            @CurrentUser UserPrincipal authUser,
            @Valid @RequestBody UpdateUserDTO requestDTO
            ) {
        return ResponseEntity.ok(userService.update(requestDTO, authUser.getId()));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteUser(
            @PathVariable Long id
    ) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
