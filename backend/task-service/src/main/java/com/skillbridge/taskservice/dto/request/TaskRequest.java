package com.skillbridge.taskservice.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public class TaskRequest {

    @NotBlank(message = "Task title is required")
    private String title;

    @Size(max = 1500, message = "Description must be less than 1500 characters")
    private String description;

    @NotNull(message = "Project id is required")
    private Long projectId;

    @NotNull(message = "Assigned user id is required")
    private Long assignedToUserId;

    @NotNull(message = "Created by user id is required")
    private Long createdByUserId;

    private String priority;

    private LocalDate dueDate;

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public Long getProjectId() {
        return projectId;
    }

    public Long getAssignedToUserId() {
        return assignedToUserId;
    }

    public Long getCreatedByUserId() {
        return createdByUserId;
    }

    public String getPriority() {
        return priority;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }
}