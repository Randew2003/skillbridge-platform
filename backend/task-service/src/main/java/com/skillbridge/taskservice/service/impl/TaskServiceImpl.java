package com.skillbridge.taskservice.service.impl;

import com.skillbridge.taskservice.dto.request.TaskRequest;
import com.skillbridge.taskservice.dto.response.TaskResponse;
import com.skillbridge.taskservice.entity.Task;
import com.skillbridge.taskservice.entity.TaskPriority;
import com.skillbridge.taskservice.entity.TaskStatus;
import com.skillbridge.taskservice.event.NotificationEvent;
import com.skillbridge.taskservice.event.TaskEventProducer;
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
    private final TaskEventProducer taskEventProducer;

    public TaskServiceImpl(TaskRepository taskRepository,
                           TaskEventProducer taskEventProducer) {
        this.taskRepository = taskRepository;
        this.taskEventProducer = taskEventProducer;
    }

    @Override
    public TaskResponse createTask(TaskRequest request) {
        Task task = new Task();

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setProjectId(request.getProjectId());
        task.setAssignedToUserId(request.getAssignedToUserId());
        task.setCreatedByUserId(request.getCreatedByUserId());
        task.setStatus(TaskStatus.TODO);
        task.setPriority(parsePriority(request.getPriority()));
        task.setDueDate(request.getDueDate());
        task.setCreatedAt(LocalDateTime.now());
        task.setUpdatedAt(LocalDateTime.now());

        Task savedTask = taskRepository.save(task);

        taskEventProducer.sendTaskNotification(
                new NotificationEvent(
                        savedTask.getAssignedToUserId(),
                        "New Task Assigned",
                        "You have been assigned a new task: " + savedTask.getTitle(),
                        "TASK_ASSIGNED"
                )
        );

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

        TaskStatus newStatus = parseStatus(status);

        task.setStatus(newStatus);
        task.setUpdatedAt(LocalDateTime.now());

        Task updatedTask = taskRepository.save(task);

        taskEventProducer.sendTaskNotification(
                new NotificationEvent(
                        updatedTask.getAssignedToUserId(),
                        "Task Status Updated",
                        "Your task '" + updatedTask.getTitle() + "' status changed to " + updatedTask.getStatus(),
                        "TASK_STATUS_UPDATED"
                )
        );

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
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid priority. Use LOW, MEDIUM, or HIGH");
        }
    }

    private TaskStatus parseStatus(String status) {
        if (status == null || status.isBlank()) {
            throw new RuntimeException("Status is required");
        }

        try {
            return TaskStatus.valueOf(status.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid status. Use TODO, IN_PROGRESS, or COMPLETED");
        }
    }
}