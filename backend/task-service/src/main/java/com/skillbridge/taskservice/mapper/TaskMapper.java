package com.skillbridge.taskservice.mapper;

import com.skillbridge.taskservice.dto.response.TaskResponse;
import com.skillbridge.taskservice.entity.Task;

public class TaskMapper {

    public static TaskResponse toTaskResponse(Task task) {
        return new TaskResponse(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getProjectId(),
                task.getAssignedToUserId(),
                task.getCreatedByUserId(),
                task.getStatus().name(),
                task.getPriority().name(),
                task.getDueDate(),
                task.getCreatedAt(),
                task.getUpdatedAt()
        );
    }
}