package com.skillbridge.taskservice.service.impl;

import com.skillbridge.taskservice.client.ProjectServiceClient;
import com.skillbridge.taskservice.dto.request.TaskRequest;
import com.skillbridge.taskservice.dto.response.ProjectMemberResponse;
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
    private final ProjectServiceClient projectServiceClient;

    public TaskServiceImpl(TaskRepository taskRepository,
                           TaskEventProducer taskEventProducer,
                           ProjectServiceClient projectServiceClient) {
        this.taskRepository = taskRepository;
        this.taskEventProducer = taskEventProducer;
        this.projectServiceClient = projectServiceClient;
    }

    @Override
    public TaskResponse createTask(TaskRequest request) {

        validateAssignedUserIsProjectMember(
                request.getProjectId(),
                request.getAssignedToUserId()
        );

        Task task = Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .projectId(request.getProjectId())
                .assignedToUserId(request.getAssignedToUserId())
                .createdByUserId(request.getCreatedByUserId())
                .status(TaskStatus.TODO)
                .priority(TaskPriority.valueOf(request.getPriority()))
                .dueDate(request.getDueDate())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

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
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Task not found with id: " + id
                ));

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
    public List<TaskResponse> getTasksByAssignedUser(Long assignedToUserId) {
        return taskRepository.findByAssignedToUserId(assignedToUserId)
                .stream()
                .map(TaskMapper::toTaskResponse)
                .toList();
    }

    @Override
    public TaskResponse updateTask(Long id, TaskRequest request) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Task not found with id: " + id
                ));

        validateAssignedUserIsProjectMember(
                request.getProjectId(),
                request.getAssignedToUserId()
        );

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setProjectId(request.getProjectId());
        task.setAssignedToUserId(request.getAssignedToUserId());
        task.setCreatedByUserId(request.getCreatedByUserId());
        task.setPriority(TaskPriority.valueOf(request.getPriority()));
        task.setDueDate(request.getDueDate());
        task.setUpdatedAt(LocalDateTime.now());

        Task updatedTask = taskRepository.save(task);

        return TaskMapper.toTaskResponse(updatedTask);
    }

    @Override
    public TaskResponse updateTaskStatus(Long id, String status) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Task not found with id: " + id
                ));

        TaskStatus taskStatus = TaskStatus.valueOf(status);

        task.setStatus(taskStatus);
        task.setUpdatedAt(LocalDateTime.now());

        Task updatedTask = taskRepository.save(task);

        taskEventProducer.sendTaskNotification(
                new NotificationEvent(
                        updatedTask.getAssignedToUserId(),
                        "Task Status Updated",
                        "Task '" + updatedTask.getTitle() + "' status changed to " + updatedTask.getStatus(),
                        "TASK_STATUS_UPDATED"
                )
        );

        return TaskMapper.toTaskResponse(updatedTask);
    }

    @Override
    public void deleteTask(Long id) {

        if (!taskRepository.existsById(id)) {
            throw new ResourceNotFoundException(
                    "Task not found with id: " + id
            );
        }

        taskRepository.deleteById(id);
    }

    private void validateAssignedUserIsProjectMember(Long projectId, Long assignedToUserId) {

        List<ProjectMemberResponse> projectMembers =
                projectServiceClient.getProjectMembers(projectId);

        boolean isProjectMember = projectMembers.stream()
                .anyMatch(member -> member.getUserId().equals(assignedToUserId));

        if (!isProjectMember) {
            throw new RuntimeException("Assigned user is not a member of this project");
        }
    }
}