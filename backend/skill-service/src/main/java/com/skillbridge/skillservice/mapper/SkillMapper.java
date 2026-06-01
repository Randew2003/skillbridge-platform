package com.skillbridge.skillservice.mapper;

import com.skillbridge.skillservice.document.Skill;
import com.skillbridge.skillservice.dto.response.SkillResponse;

public class SkillMapper {

    public static SkillResponse toSkillResponse(Skill skill) {
        return new SkillResponse(
                skill.getId(),
                skill.getUserId(),
                skill.getProjectId(),
                skill.getType(),
                skill.getSkills(),
                skill.getCreatedAt(),
                skill.getUpdatedAt()
        );
    }
}