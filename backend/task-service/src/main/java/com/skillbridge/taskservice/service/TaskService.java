package com.skillbridge.taskservice.service;

import com.skillbridge.taskservice.dto.request.TaskRequest;
import com.skillbridge.taskservice.dto.response.TaskResponse;

import java.util.List;

public interface TaskService {

    TaskResponse createTask(TaskRequest request);

    TaskResponse getTaskById(Long id);

    List<TaskResponse> getAllTasks();

    List<TaskResponse> getTasksByProject(Long projectId);

    List<TaskResponse> getTasksByAssignedUser(Long userId);

    TaskResponse updateTask(Long id, TaskRequest request);

    TaskResponse updateTaskStatus(Long id, String status);

    void deleteTask(Long id);
}