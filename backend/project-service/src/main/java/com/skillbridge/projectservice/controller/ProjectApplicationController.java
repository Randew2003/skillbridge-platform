package com.skillbridge.projectservice.controller;

import com.skillbridge.projectservice.dto.request.ProjectApplicationRequest;
import com.skillbridge.projectservice.dto.response.ProjectApplicationResponse;
import com.skillbridge.projectservice.service.ProjectApplicationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/project-applications")
public class ProjectApplicationController {

    private final ProjectApplicationService projectApplicationService;

    public ProjectApplicationController(ProjectApplicationService projectApplicationService) {
        this.projectApplicationService = projectApplicationService;
    }

    @PostMapping
    public ResponseEntity<ProjectApplicationResponse> applyToProject(
            @Valid @RequestBody ProjectApplicationRequest request
    ) {
        return ResponseEntity.ok(projectApplicationService.applyToProject(request));
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<ProjectApplicationResponse>> getApplicationsByProject(
            @PathVariable Long projectId
    ) {
        return ResponseEntity.ok(projectApplicationService.getApplicationsByProject(projectId));
    }

    @GetMapping("/applicant/{applicantId}")
    public ResponseEntity<List<ProjectApplicationResponse>> getApplicationsByApplicant(
            @PathVariable Long applicantId
    ) {
        return ResponseEntity.ok(projectApplicationService.getApplicationsByApplicant(applicantId));
    }

    @PutMapping("/{applicationId}/accept")
    public ResponseEntity<ProjectApplicationResponse> acceptApplication(
            @PathVariable Long applicationId
    ) {
        return ResponseEntity.ok(projectApplicationService.acceptApplication(applicationId));
    }

    @PutMapping("/{applicationId}/reject")
    public ResponseEntity<ProjectApplicationResponse> rejectApplication(
            @PathVariable Long applicationId
    ) {
        return ResponseEntity.ok(projectApplicationService.rejectApplication(applicationId));
    }
}