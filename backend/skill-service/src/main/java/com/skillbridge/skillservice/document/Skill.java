package com.skillbridge.skillservice.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "skills")
public class Skill {

    @Id
    private String id;

    private Long userId;

    private Long projectId;

    private String type;

    private List<String> skills;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    public Skill() {
    }

    public Skill(String id, Long userId, Long projectId, String type, List<String> skills,
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

    public void setId(String id) {
        this.id = id;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}