package com.skillbridge.userservice.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {

    private Long id;
    private String fullName;
    private String email;
    private String university;
    private String githubUrl;
    private String linkedinUrl;
    private String role;
}