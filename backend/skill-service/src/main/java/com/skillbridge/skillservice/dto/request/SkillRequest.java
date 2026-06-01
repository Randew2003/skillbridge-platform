package com.skillbridge.skillservice.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public class SkillRequest {

    private Long userId;

    private Long projectId;

    @NotNull(message = "Type is required")
    private String type;

    @NotEmpty(message = "Skills list cannot be empty")
    private List<String> skills;

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
}