package com.menters.server.components.mentoring.controller;

import com.menters.server.components.mentoring.dto.MentoringRequestDTO;
import com.menters.server.components.mentoring.dto.MentoringResponseDTO;
import com.menters.server.components.mentoring.service.MentoringService;
import com.menters.server.components.user.dto.UserResponseDTO;
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
@RequestMapping("/api/v1/mentoring")
public class MentoringController {
    private final MentoringService mentoringService;

    @PostMapping()
    public ResponseEntity<MentoringResponseDTO> create(
            @Valid @RequestBody MentoringRequestDTO requestDTO,
            @CurrentUser UserPrincipal authUser
            ) {
        Long mentorId = authUser.getId();
        return new ResponseEntity<>(mentoringService.create(requestDTO, mentorId), HttpStatus.CREATED);
    }

    @GetMapping("/menteesOfMentor")
    private ResponseEntity<List<UserResponseDTO>> getMenteesOfMentor(
            @CurrentUser UserPrincipal authUser
    ) {
        Long mentorId = authUser.getId();
        return ResponseEntity.ok(mentoringService.getMenteesOfMentor(mentorId));
    }

    @GetMapping("/mentorsOfMentee")
    private ResponseEntity<List<MentoringResponseDTO>> getMentorsOfMentee(
            @CurrentUser UserPrincipal authUser
    ) {
        Long menteeId = authUser.getId();
        return ResponseEntity.ok(mentoringService.getMentorsOfMentee(menteeId));
    }

    @GetMapping("/mentoringDetails/{id}")
    private ResponseEntity<MentoringResponseDTO> getMentoring(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(mentoringService.getMentoring(id));
    }

    @DeleteMapping("/{mentoringId}")
    private ResponseEntity<Void> delete(
            @PathVariable Long mentoringId
    ) {
        mentoringService.delete(mentoringId);
        return ResponseEntity.noContent().build();
    }
}
