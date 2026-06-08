package com.skillbridge.userservice.dto.response;

import com.skillbridge.userservice.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class UserResponse {

    private Long id;
    private String fullName;
    private String email;
    private String university;
    private String githubUrl;
    private String linkedinUrl;
    private Role role;
    private Boolean active;
}