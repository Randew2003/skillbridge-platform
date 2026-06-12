package com.skillbridge.taskservice.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ProjectMemberResponse {

    private Long id;
    private Long projectId;
    private Long userId;
    private LocalDateTime joinedAt;

    private UserProfileSummaryResponse userProfile;
}