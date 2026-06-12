package com.skillbridge.taskservice.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserProfileSummaryResponse {

    private Long id;
    private String fullName;
    private String email;
    private String university;
    private String githubUrl;
    private String linkedinUrl;
    private String role;
    private Boolean active;
}