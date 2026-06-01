package com.skillbridge.projectservice.mapper;

import com.skillbridge.projectservice.dto.response.ProjectApplicationResponse;
import com.skillbridge.projectservice.dto.response.ProjectResponse;
import com.skillbridge.projectservice.entity.Project;
import com.skillbridge.projectservice.entity.ProjectApplication;

public class ProjectMapper {

    public static ProjectResponse toProjectResponse(Project project) {
        return new ProjectResponse(
                project.getId(),
                project.getTitle(),
                project.getDescription(),
                project.getCategory(),
                project.getMaxMembers(),
                project.getOwnerId(),
                project.getStatus().name(),
                project.getCreatedAt(),
                project.getUpdatedAt()
        );
    }

    public static ProjectApplicationResponse toProjectApplicationResponse(ProjectApplication application) {
        return new ProjectApplicationResponse(
                application.getId(),
                application.getProjectId(),
                application.getApplicantId(),
                application.getMessage(),
                application.getStatus().name(),
                application.getAppliedAt()
        );
    }
}