package com.skillbridge.projectservice.service.impl;

import com.skillbridge.projectservice.client.UserServiceClient;
import com.skillbridge.projectservice.dto.request.ProjectApplicationRequest;
import com.skillbridge.projectservice.dto.response.ProjectApplicationResponse;
import com.skillbridge.projectservice.dto.response.UserProfileSummaryResponse;
import com.skillbridge.projectservice.entity.ApplicationStatus;
import com.skillbridge.projectservice.entity.Project;
import com.skillbridge.projectservice.entity.ProjectApplication;
import com.skillbridge.projectservice.entity.ProjectMember;
import com.skillbridge.projectservice.event.NotificationEvent;
import com.skillbridge.projectservice.event.ProjectEventProducer;
import com.skillbridge.projectservice.exception.ResourceNotFoundException;
import com.skillbridge.projectservice.repository.ProjectApplicationRepository;
import com.skillbridge.projectservice.repository.ProjectMemberRepository;
import com.skillbridge.projectservice.repository.ProjectRepository;
import com.skillbridge.projectservice.service.ProjectApplicationService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProjectApplicationServiceImpl implements ProjectApplicationService {

    private final ProjectApplicationRepository projectApplicationRepository;
    private final ProjectRepository projectRepository;
    private final ProjectMemberRepository projectMemberRepository;
    private final ProjectEventProducer projectEventProducer;
    private final UserServiceClient userServiceClient;

    public ProjectApplicationServiceImpl(ProjectApplicationRepository projectApplicationRepository,
                                         ProjectRepository projectRepository,
                                         ProjectMemberRepository projectMemberRepository,
                                         ProjectEventProducer projectEventProducer,
                                         UserServiceClient userServiceClient) {
        this.projectApplicationRepository = projectApplicationRepository;
        this.projectRepository = projectRepository;
        this.projectMemberRepository = projectMemberRepository;
        this.projectEventProducer = projectEventProducer;
        this.userServiceClient = userServiceClient;
    }

    @Override
    public ProjectApplicationResponse applyToProject(ProjectApplicationRequest request) {

        Project project = projectRepository.findById(request.getProjectId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Project not found with id: " + request.getProjectId()
                ));

        UserProfileSummaryResponse applicant =
                userServiceClient.getUserProfileSummary(request.getApplicantId());

        if (applicant == null || Boolean.FALSE.equals(applicant.getActive())) {
            throw new RuntimeException("Applicant user is not valid or inactive");
        }

        if (project.getOwnerId().equals(request.getApplicantId())) {
            throw new RuntimeException("Project owner cannot apply to own project");
        }

        boolean alreadyApplied = projectApplicationRepository
                .existsByProjectIdAndApplicantId(
                        request.getProjectId(),
                        request.getApplicantId()
                );

        if (alreadyApplied) {
            throw new RuntimeException("You have already applied to this project");
        }

        boolean alreadyMember = projectMemberRepository
                .existsByProjectIdAndUserId(
                        request.getProjectId(),
                        request.getApplicantId()
                );

        if (alreadyMember) {
            throw new RuntimeException("User is already a member of this project");
        }

        ProjectApplication application = new ProjectApplication();

        application.setProjectId(request.getProjectId());
        application.setApplicantId(request.getApplicantId());
        application.setMessage(request.getMessage());
        application.setStatus(ApplicationStatus.PENDING);
        application.setAppliedAt(LocalDateTime.now());

        ProjectApplication savedApplication = projectApplicationRepository.save(application);

        projectEventProducer.sendProjectNotification(
                new NotificationEvent(
                        project.getOwnerId(),
                        "New Project Application",
                        applicant.getFullName() + " has applied to your project: " + project.getTitle(),
                        "PROJECT_APPLICATION_SUBMITTED"
                )
        );

        return mapToApplicationResponse(savedApplication);
    }

    @Override
    public List<ProjectApplicationResponse> getApplicationsByProject(Long projectId) {

        if (!projectRepository.existsById(projectId)) {
            throw new ResourceNotFoundException("Project not found with id: " + projectId);
        }

        return projectApplicationRepository.findByProjectId(projectId)
                .stream()
                .map(this::mapToApplicationResponse)
                .toList();
    }

    @Override
    public List<ProjectApplicationResponse> getApplicationsByApplicant(Long applicantId) {

        userServiceClient.getUserProfileSummary(applicantId);

        return projectApplicationRepository.findByApplicantId(applicantId)
                .stream()
                .map(this::mapToApplicationResponse)
                .toList();
    }

    @Override
    public ProjectApplicationResponse acceptApplication(Long applicationId) {

        ProjectApplication application = projectApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Application not found with id: " + applicationId
                ));

        Project project = projectRepository.findById(application.getProjectId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Project not found with id: " + application.getProjectId()
                ));

        UserProfileSummaryResponse applicant =
                userServiceClient.getUserProfileSummary(application.getApplicantId());

        if (applicant == null || Boolean.FALSE.equals(applicant.getActive())) {
            throw new RuntimeException("Applicant user is not valid or inactive");
        }

        if (application.getStatus() != ApplicationStatus.PENDING) {
            throw new RuntimeException("Only pending applications can be accepted");
        }

        application.setStatus(ApplicationStatus.ACCEPTED);

        ProjectApplication savedApplication = projectApplicationRepository.save(application);

        boolean alreadyMember = projectMemberRepository
                .existsByProjectIdAndUserId(
                        application.getProjectId(),
                        application.getApplicantId()
                );

        if (!alreadyMember) {
            ProjectMember member = new ProjectMember();

            member.setProjectId(application.getProjectId());
            member.setUserId(application.getApplicantId());
            member.setJoinedAt(LocalDateTime.now());

            projectMemberRepository.save(member);
        }

        projectEventProducer.sendProjectNotification(
                new NotificationEvent(
                        application.getApplicantId(),
                        "Application Accepted",
                        "Your application for project '" + project.getTitle() + "' was accepted.",
                        "PROJECT_APPLICATION_ACCEPTED"
                )
        );

        return mapToApplicationResponse(savedApplication);
    }

    @Override
    public ProjectApplicationResponse rejectApplication(Long applicationId) {

        ProjectApplication application = projectApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Application not found with id: " + applicationId
                ));

        Project project = projectRepository.findById(application.getProjectId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Project not found with id: " + application.getProjectId()
                ));

        if (application.getStatus() != ApplicationStatus.PENDING) {
            throw new RuntimeException("Only pending applications can be rejected");
        }

        application.setStatus(ApplicationStatus.REJECTED);

        ProjectApplication savedApplication = projectApplicationRepository.save(application);

        projectEventProducer.sendProjectNotification(
                new NotificationEvent(
                        application.getApplicantId(),
                        "Application Rejected",
                        "Your application for project '" + project.getTitle() + "' was rejected.",
                        "PROJECT_APPLICATION_REJECTED"
                )
        );

        return mapToApplicationResponse(savedApplication);
    }

    private ProjectApplicationResponse mapToApplicationResponse(ProjectApplication application) {
        UserProfileSummaryResponse applicantProfile =
                userServiceClient.getUserProfileSummary(application.getApplicantId());

        return new ProjectApplicationResponse(
                application.getId(),
                application.getProjectId(),
                application.getApplicantId(),
                application.getMessage(),
                application.getStatus().name(),
                application.getAppliedAt(),
                applicantProfile
        );
    }
}