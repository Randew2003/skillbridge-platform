package com.skillbridge.userservice.mapper;

import com.skillbridge.userservice.dto.response.UserResponse;
import com.skillbridge.userservice.entity.User;

public class UserMapper {

    public static UserResponse toUserResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .university(user.getUniversity())
                .githubUrl(user.getGithubUrl())
                .linkedinUrl(user.getLinkedinUrl())
                .role(user.getRole().name())
                .build();
    }
}