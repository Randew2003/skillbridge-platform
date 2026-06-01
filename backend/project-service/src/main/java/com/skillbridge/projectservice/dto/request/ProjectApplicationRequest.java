package com.skillbridge.projectservice.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class ProjectApplicationRequest {

    @NotNull(message = "Project id is required")
    private Long projectId;

    @NotNull(message = "Applicant id is required")
    private Long applicantId;

    @Size(max = 1000, message = "Message must be less than 1000 characters")
    private String message;

    public Long getProjectId() {
        return projectId;
    }

    public Long getApplicantId() {
        return applicantId;
    }

    public String getMessage() {
        return message;
    }
}