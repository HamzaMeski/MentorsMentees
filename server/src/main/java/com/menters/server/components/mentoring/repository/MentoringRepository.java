package com.menters.server.components.mentoring.repository;

import com.menters.server.entities.Mentoring;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MentoringRepository extends JpaRepository<Mentoring, Long> {

    @Query("""
        SELECT COUNT(m) > 0
        FROM Mentoring m
        WHERE(m.mentor.id = :mentorId AND m.mentee.id = :menteeId)
    """)
    boolean isMentoringExists(Long mentorId, Long menteeId);

    @Query("""
        SELECT m
        FROM Mentoring m
        WHERE(m.mentor.id = :mentorId)
    """)
    List<Mentoring> getMenteesOfMentor(Long mentorId);

    @Query("""
        SELECT m
        FROM Mentoring m
        WHERE(m.mentee.id = :menteeId)
    """)
    List<Mentoring> getMentorsOfMentee(Long menteeId);
}
