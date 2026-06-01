package com.skillbridge.projectservice.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class ProjectRequest {

    @NotBlank(message = "Project title is required")
    private String title;

    @NotBlank(message = "Project description is required")
    @Size(max = 2000, message = "Description must be less than 2000 characters")
    private String description;

    private String category;

    @NotNull(message = "Maximum members is required")
    private Integer maxMembers;

    @NotNull(message = "Owner id is required")
    private Long ownerId;

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getCategory() {
        return category;
    }

    public Integer getMaxMembers() {
        return maxMembers;
    }

    public Long getOwnerId() {
        return ownerId;
    }
}