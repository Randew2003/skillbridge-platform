package com.skillbridge.projectservice.dto.response;

import java.time.LocalDateTime;

public class ProjectApplicationResponse {

    private Long id;
    private Long projectId;
    private Long applicantId;
    private String message;
    private String status;
    private LocalDateTime appliedAt;

    private UserProfileSummaryResponse applicantProfile;

    public ProjectApplicationResponse(Long id,
                                      Long projectId,
                                      Long applicantId,
                                      String message,
                                      String status,
                                      LocalDateTime appliedAt) {
        this.id = id;
        this.projectId = projectId;
        this.applicantId = applicantId;
        this.message = message;
        this.status = status;
        this.appliedAt = appliedAt;
    }

    public ProjectApplicationResponse(Long id,
                                      Long projectId,
                                      Long applicantId,
                                      String message,
                                      String status,
                                      LocalDateTime appliedAt,
                                      UserProfileSummaryResponse applicantProfile) {
        this.id = id;
        this.projectId = projectId;
        this.applicantId = applicantId;
        this.message = message;
        this.status = status;
        this.appliedAt = appliedAt;
        this.applicantProfile = applicantProfile;
    }

    public Long getId() {
        return id;
    }

    public Long getProjectId() {
        return projectId;
    }

    public Long getApplicantId() {
        return applicantId;
    }

    public String getMessage() {
        return message;
    }

    public String getStatus() {
        return status;
    }

    public LocalDateTime getAppliedAt() {
        return appliedAt;
    }

    public UserProfileSummaryResponse getApplicantProfile() {
        return applicantProfile;
    }
}