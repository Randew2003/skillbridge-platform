package com.skillbridge.projectservice.repository;

import com.skillbridge.projectservice.entity.ProjectApplication;
import com.skillbridge.projectservice.entity.ApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectApplicationRepository extends JpaRepository<ProjectApplication, Long> {

    List<ProjectApplication> findByProjectId(Long projectId);

    List<ProjectApplication> findByApplicantId(Long applicantId);

    List<ProjectApplication> findByProjectIdAndStatus(Long projectId, ApplicationStatus status);

    boolean existsByProjectIdAndApplicantId(Long projectId, Long applicantId);
}