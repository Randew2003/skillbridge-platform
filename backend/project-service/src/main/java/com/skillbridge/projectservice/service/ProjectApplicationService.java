package com.skillbridge.projectservice.service;

import com.skillbridge.projectservice.dto.request.ProjectApplicationRequest;
import com.skillbridge.projectservice.dto.response.ProjectApplicationResponse;

import java.util.List;

public interface ProjectApplicationService {

    ProjectApplicationResponse applyToProject(ProjectApplicationRequest request);

    List<ProjectApplicationResponse> getApplicationsByProject(Long projectId);

    List<ProjectApplicationResponse> getApplicationsByApplicant(Long applicantId);

    ProjectApplicationResponse acceptApplication(Long applicationId);

    ProjectApplicationResponse rejectApplication(Long applicationId);
}