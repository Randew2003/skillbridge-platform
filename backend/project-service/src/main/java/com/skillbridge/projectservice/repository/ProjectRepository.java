package com.skillbridge.projectservice.repository;

import com.skillbridge.projectservice.entity.Project;
import com.skillbridge.projectservice.entity.ProjectStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    List<Project> findByStatus(ProjectStatus status);

    List<Project> findByOwnerId(Long ownerId);

    List<Project> findByCategoryIgnoreCase(String category);
}