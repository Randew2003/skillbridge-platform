package com.skillbridge.projectservice.service.impl;

import com.skillbridge.projectservice.dto.request.ProjectApplicationRequest;
import com.skillbridge.projectservice.dto.response.ProjectApplicationResponse;
import com.skillbridge.projectservice.entity.ApplicationStatus;
import com.skillbridge.projectservice.entity.Project;
import com.skillbridge.projectservice.entity.ProjectApplication;
import com.skillbridge.projectservice.entity.ProjectMember;
import com.skillbridge.projectservice.exception.ResourceNotFoundException;
import com.skillbridge.projectservice.mapper.ProjectMapper;
import com.skillbridge.projectservice.repository.ProjectApplicationRepository;
import com.skillbridge.projectservice.repository.ProjectMemberRepository;
import com.skillbridge.projectservice.repository.ProjectRepository;
import com.skillbridge.projectservice.service.ProjectApplicationService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProjectApplicationServiceImpl implements ProjectApplicationService {

    private final ProjectApplicationRepository applicationRepository;
    private final ProjectRepository projectRepository;
    private final ProjectMemberRepository projectMemberRepository;

    public ProjectApplicationServiceImpl(ProjectApplicationRepository applicationRepository,
                                         ProjectRepository projectRepository,
                                         ProjectMemberRepository projectMemberRepository) {
        this.applicationRepository = applicationRepository;
        this.projectRepository = projectRepository;
        this.projectMemberRepository = projectMemberRepository;
    }

    @Override
    public ProjectApplicationResponse applyToProject(ProjectApplicationRequest request) {
        projectRepository.findById(request.getProjectId())
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + request.getProjectId()));

        if (projectMemberRepository.existsByProjectIdAndUserId(request.getProjectId(), request.getApplicantId())) {
            throw new RuntimeException("User is already a member of this project");
        }

        if (applicationRepository.existsByProjectIdAndApplicantId(request.getProjectId(), request.getApplicantId())) {
            throw new RuntimeException("User has already applied to this project");
        }

        ProjectApplication application = ProjectApplication.builder()
                .projectId(request.getProjectId())
                .applicantId(request.getApplicantId())
                .message(request.getMessage())
                .status(ApplicationStatus.PENDING)
                .appliedAt(LocalDateTime.now())
                .build();

        ProjectApplication savedApplication = applicationRepository.save(application);
        return ProjectMapper.toProjectApplicationResponse(savedApplication);
    }

    @Override
    public List<ProjectApplicationResponse> getApplicationsByProject(Long projectId) {
        return applicationRepository.findByProjectId(projectId)
                .stream()
                .map(ProjectMapper::toProjectApplicationResponse)
                .toList();
    }

    @Override
    public List<ProjectApplicationResponse> getApplicationsByApplicant(Long applicantId) {
        return applicationRepository.findByApplicantId(applicantId)
                .stream()
                .map(ProjectMapper::toProjectApplicationResponse)
                .toList();
    }

    @Override
    public ProjectApplicationResponse acceptApplication(Long applicationId) {
        ProjectApplication application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with id: " + applicationId));

        if (application.getStatus() != ApplicationStatus.PENDING) {
            throw new RuntimeException("Application is already processed");
        }

        Project project = projectRepository.findById(application.getProjectId())
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + application.getProjectId()));

        application.setStatus(ApplicationStatus.ACCEPTED);

        ProjectMember member = ProjectMember.builder()
                .projectId(project.getId())
                .userId(application.getApplicantId())
                .joinedAt(LocalDateTime.now())
                .build();

        projectMemberRepository.save(member);
        ProjectApplication savedApplication = applicationRepository.save(application);

        return ProjectMapper.toProjectApplicationResponse(savedApplication);
    }

    @Override
    public ProjectApplicationResponse rejectApplication(Long applicationId) {
        ProjectApplication application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with id: " + applicationId));

        if (application.getStatus() != ApplicationStatus.PENDING) {
            throw new RuntimeException("Application is already processed");
        }

        application.setStatus(ApplicationStatus.REJECTED);

        ProjectApplication savedApplication = applicationRepository.save(application);
        return ProjectMapper.toProjectApplicationResponse(savedApplication);
    }
}