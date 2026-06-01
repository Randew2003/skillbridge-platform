package com.skillbridge.taskservice.repository;

import com.skillbridge.taskservice.entity.Task;
import com.skillbridge.taskservice.entity.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByProjectId(Long projectId);

    List<Task> findByAssignedToUserId(Long assignedToUserId);

    List<Task> findByCreatedByUserId(Long createdByUserId);

    List<Task> findByProjectIdAndStatus(Long projectId, TaskStatus status);
}