package com.skillbridge.taskservice.service.impl;

import com.skillbridge.taskservice.dto.request.TaskRequest;
import com.skillbridge.taskservice.dto.response.TaskResponse;
import com.skillbridge.taskservice.entity.Task;
import com.skillbridge.taskservice.entity.TaskPriority;
import com.skillbridge.taskservice.entity.TaskStatus;
import com.skillbridge.taskservice.exception.ResourceNotFoundException;
import com.skillbridge.taskservice.mapper.TaskMapper;
import com.skillbridge.taskservice.repository.TaskRepository;
import com.skillbridge.taskservice.service.TaskService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public TaskResponse createTask(TaskRequest request) {
        Task task = Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .projectId(request.getProjectId())
                .assignedToUserId(request.getAssignedToUserId())
                .createdByUserId(request.getCreatedByUserId())
                .status(TaskStatus.TODO)
                .priority(parsePriority(request.getPriority()))
                .dueDate(request.getDueDate())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        Task savedTask = taskRepository.save(task);
        return TaskMapper.toTaskResponse(savedTask);
    }

    @Override
    public TaskResponse getTaskById(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + id));

        return TaskMapper.toTaskResponse(task);
    }

    @Override
    public List<TaskResponse> getAllTasks() {
        return taskRepository.findAll()
                .stream()
                .map(TaskMapper::toTaskResponse)
                .toList();
    }

    @Override
    public List<TaskResponse> getTasksByProject(Long projectId) {
        return taskRepository.findByProjectId(projectId)
                .stream()
                .map(TaskMapper::toTaskResponse)
                .toList();
    }

    @Override
    public List<TaskResponse> getTasksByAssignedUser(Long userId) {
        return taskRepository.findByAssignedToUserId(userId)
                .stream()
                .map(TaskMapper::toTaskResponse)
                .toList();
    }

    @Override
    public TaskResponse updateTask(Long id, TaskRequest request) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + id));

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setProjectId(request.getProjectId());
        task.setAssignedToUserId(request.getAssignedToUserId());
        task.setCreatedByUserId(request.getCreatedByUserId());
        task.setPriority(parsePriority(request.getPriority()));
        task.setDueDate(request.getDueDate());
        task.setUpdatedAt(LocalDateTime.now());

        Task updatedTask = taskRepository.save(task);
        return TaskMapper.toTaskResponse(updatedTask);
    }

    @Override
    public TaskResponse updateTaskStatus(Long id, String status) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + id));

        task.setStatus(parseStatus(status));
        task.setUpdatedAt(LocalDateTime.now());

        Task updatedTask = taskRepository.save(task);
        return TaskMapper.toTaskResponse(updatedTask);
    }

    @Override
    public void deleteTask(Long id) {
        if (!taskRepository.existsById(id)) {
            throw new ResourceNotFoundException("Task not found with id: " + id);
        }

        taskRepository.deleteById(id);
    }

    private TaskPriority parsePriority(String priority) {
        if (priority == null || priority.isBlank()) {
            return TaskPriority.MEDIUM;
        }

        try {
            return TaskPriority.valueOf(priority.toUpperCase());
        } catch (IllegalArgumentException ex) {
            throw new RuntimeException("Invalid task priority. Use LOW, MEDIUM, or HIGH");
        }
    }

    private TaskStatus parseStatus(String status) {
        if (status == null || status.isBlank()) {
            throw new RuntimeException("Task status is required");
        }

        try {
            return TaskStatus.valueOf(status.toUpperCase());
        } catch (IllegalArgumentException ex) {
            throw new RuntimeException("Invalid task status. Use TODO, IN_PROGRESS, or COMPLETED");
        }
    }
}