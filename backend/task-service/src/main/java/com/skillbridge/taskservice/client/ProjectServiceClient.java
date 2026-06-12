package com.skillbridge.taskservice.client;

import com.skillbridge.taskservice.dto.response.ProjectMemberResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "PROJECT-SERVICE")
public interface ProjectServiceClient {

    @GetMapping("/api/projects/{projectId}/members")
    List<ProjectMemberResponse> getProjectMembers(@PathVariable Long projectId);
}