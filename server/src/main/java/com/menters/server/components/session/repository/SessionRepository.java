package com.menters.server.components.session.repository;

import com.menters.server.entities.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SessionRepository extends JpaRepository<Session, Long> {
    @Query("""
        SELECT s
        FROM Session s
        WHERE(s.mentor.id = :mentorId AND s.mentee.id = :menteeId)
    """)
    List<Session> getMentorSessions(Long mentorId, Long menteeId);

    @Query("""
        SELECT s
        FROM Session s
        WHERE(s.mentee.id = :menteeId AND s.mentor.id = :mentorId)
    """)
    List<Session> getMenteeSessions(Long menteeId, Long mentorId);
}
