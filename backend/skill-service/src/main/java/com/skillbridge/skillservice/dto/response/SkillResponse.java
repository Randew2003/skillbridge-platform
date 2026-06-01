package com.skillbridge.skillservice.dto.response;

import java.time.LocalDateTime;
import java.util.List;

public class SkillResponse {

    private String id;
    private Long userId;
    private Long projectId;
    private String type;
    private List<String> skills;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public SkillResponse(String id, Long userId, Long projectId, String type, List<String> skills,
                         LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.userId = userId;
        this.projectId = projectId;
        this.type = type;
        this.skills = skills;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public String getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getProjectId() {
        return projectId;
    }

    public String getType() {
        return type;
    }

    public List<String> getSkills() {
        return skills;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}