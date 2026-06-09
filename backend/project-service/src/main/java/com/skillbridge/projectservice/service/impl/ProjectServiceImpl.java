package com.skillbridge.projectservice.service.impl;

import com.skillbridge.projectservice.dto.request.ProjectRequest;
import com.skillbridge.projectservice.dto.response.ProjectMemberResponse;
import com.skillbridge.projectservice.dto.response.ProjectResponse;
import com.skillbridge.projectservice.entity.Project;
import com.skillbridge.projectservice.entity.ProjectMember;
import com.skillbridge.projectservice.entity.ProjectStatus;
import com.skillbridge.projectservice.exception.ResourceNotFoundException;
import com.skillbridge.projectservice.mapper.ProjectMapper;
import com.skillbridge.projectservice.repository.ProjectMemberRepository;
import com.skillbridge.projectservice.repository.ProjectRepository;
import com.skillbridge.projectservice.service.ProjectService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectMemberRepository projectMemberRepository;

    public ProjectServiceImpl(ProjectRepository projectRepository,
                              ProjectMemberRepository projectMemberRepository) {
        this.projectRepository = projectRepository;
        this.projectMemberRepository = projectMemberRepository;
    }

    @Override
    public ProjectResponse createProject(ProjectRequest request) {
        Project project = Project.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .category(request.getCategory())
                .maxMembers(request.getMaxMembers())
                .ownerId(request.getOwnerId())
                .status(ProjectStatus.OPEN)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        Project savedProject = projectRepository.save(project);
        return ProjectMapper.toProjectResponse(savedProject);
    }

    @Override
    public ProjectResponse getProjectById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));

        return ProjectMapper.toProjectResponse(project);
    }

    @Override
    public List<ProjectResponse> getAllProjects() {
        return projectRepository.findAll()
                .stream()
                .map(ProjectMapper::toProjectResponse)
                .toList();
    }

    @Override
    public List<ProjectResponse> getProjectsByOwner(Long ownerId) {
        return projectRepository.findByOwnerId(ownerId)
                .stream()
                .map(ProjectMapper::toProjectResponse)
                .toList();
    }

    @Override
    public List<ProjectResponse> getOpenProjects() {
        return projectRepository.findByStatus(ProjectStatus.OPEN)
                .stream()
                .map(ProjectMapper::toProjectResponse)
                .toList();
    }

    @Override
    public List<ProjectMemberResponse> getProjectMembers(Long projectId) {
        if (!projectRepository.existsById(projectId)) {
            throw new ResourceNotFoundException("Project not found with id: " + projectId);
        }

        return projectMemberRepository.findByProjectId(projectId)
                .stream()
                .map(this::mapToProjectMemberResponse)
                .toList();
    }

    @Override
    public ProjectResponse updateProject(Long id, ProjectRequest request) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));

        project.setTitle(request.getTitle());
        project.setDescription(request.getDescription());
        project.setCategory(request.getCategory());
        project.setMaxMembers(request.getMaxMembers());
        project.setOwnerId(request.getOwnerId());
        project.setUpdatedAt(LocalDateTime.now());

        Project updatedProject = projectRepository.save(project);
        return ProjectMapper.toProjectResponse(updatedProject);
    }

    @Override
    public void deleteProject(Long id) {
        if (!projectRepository.existsById(id)) {
            throw new ResourceNotFoundException("Project not found with id: " + id);
        }

        projectRepository.deleteById(id);
    }

    private ProjectMemberResponse mapToProjectMemberResponse(ProjectMember member) {
        return ProjectMemberResponse.builder()
                .id(member.getId())
                .projectId(member.getProjectId())
                .userId(member.getUserId())
                .joinedAt(member.getJoinedAt())
                .build();
    }
}