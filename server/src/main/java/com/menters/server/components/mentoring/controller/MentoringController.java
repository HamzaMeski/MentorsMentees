package com.menters.server.components.mentoring.controller;

import com.menters.server.components.mentoring.dto.MentoringRequestDTO;
import com.menters.server.components.mentoring.dto.MentoringResponseDTO;
import com.menters.server.components.mentoring.service.MentoringService;
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
            @Valid
            @RequestBody
            MentoringRequestDTO requestDTO
    ) {
        return new ResponseEntity<>(mentoringService.create(requestDTO), HttpStatus.CREATED);
    }

    @GetMapping("/menteesOfMentor/{mentorId}")
    private ResponseEntity<List<MentoringResponseDTO>> getMenteesOfMentor(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(mentoringService.getMenteesOfMentor(id));
    }

    @GetMapping("/mentorsOfMentee/{menteeId}")
    private ResponseEntity<List<MentoringResponseDTO>> getMentorsOfMentee(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(mentoringService.getMentorsOfMentee(id));
    }

    @DeleteMapping("/{mentoringId}")
    private ResponseEntity<Void> delete(
            @PathVariable Long mentoringId
    ) {
        mentoringService.delete(mentoringId);
        return ResponseEntity.noContent().build();
    }
}
