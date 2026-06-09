package com.skillbridge.projectservice.service;

import com.skillbridge.projectservice.dto.request.ProjectRequest;
import com.skillbridge.projectservice.dto.response.ProjectMemberResponse;
import com.skillbridge.projectservice.dto.response.ProjectResponse;

import java.util.List;

public interface ProjectService {

    ProjectResponse createProject(ProjectRequest request);

    ProjectResponse getProjectById(Long id);

    List<ProjectResponse> getAllProjects();

    List<ProjectResponse> getProjectsByOwner(Long ownerId);

    List<ProjectResponse> getOpenProjects();

    List<ProjectMemberResponse> getProjectMembers(Long projectId);

    ProjectResponse updateProject(Long id, ProjectRequest request);

    void deleteProject(Long id);
}