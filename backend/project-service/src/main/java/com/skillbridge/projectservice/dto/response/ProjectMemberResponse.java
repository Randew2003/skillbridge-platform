package com.skillbridge.projectservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class ProjectMemberResponse {

    private Long id;
    private Long projectId;
    private Long userId;
    private LocalDateTime joinedAt;
}