package com.menters.server.components.session.controller;

import com.menters.server.components.session.dto.SessionRequestDTO;
import com.menters.server.components.session.dto.SessionResponseDTO;
import com.menters.server.components.session.service.SessionService;
import com.menters.server.security.CurrentUser;
import com.menters.server.security.UserPrincipal;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/session")
public class SessionController {
    private final SessionService sessionService;

    @PostMapping()
    public ResponseEntity<SessionResponseDTO> create(
            @Valid
            @RequestBody
            SessionRequestDTO requestDTO
    ) {
        return new ResponseEntity<>(sessionService.create(requestDTO), HttpStatus.CREATED);
    }

    @GetMapping("/mentorSessions")
    private ResponseEntity<List<SessionResponseDTO>> getMenteesOfMentor(
            @CurrentUser UserPrincipal authUser
            ) {
        return ResponseEntity.ok(sessionService.getMentorSessions(authUser.getId()));
    }

    @GetMapping("/menteeSessions")
    private ResponseEntity<List<SessionResponseDTO>> getMentorsOfMentee(
            @CurrentUser UserPrincipal authUser
    ) {
        return ResponseEntity.ok(sessionService.getMenteeSessions(authUser.getId()));
    }

    @DeleteMapping("/{sessionId}")
    private ResponseEntity<Void> delete(
            @PathVariable Long sessionId
    ) {
        sessionService.deleteSession(sessionId);
        return ResponseEntity.noContent().build();
    }
}
