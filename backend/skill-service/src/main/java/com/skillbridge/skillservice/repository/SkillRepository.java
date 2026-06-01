package com.skillbridge.skillservice.repository;

import com.skillbridge.skillservice.document.Skill;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface SkillRepository extends MongoRepository<Skill, String> {

    Optional<Skill> findByUserIdAndType(Long userId, String type);

    Optional<Skill> findByProjectIdAndType(Long projectId, String type);

    List<Skill> findBySkillsContainingIgnoreCase(String skill);

    List<Skill> findByType(String type);
}
