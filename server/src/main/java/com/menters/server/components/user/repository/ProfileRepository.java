package com.menters.server.components.user.repository;

import com.menters.server.entities.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
    List<Profile> findAllByUserIdIn(List<Long> ids);
}
