package com.skillbridge.userservice.service.impl;

import com.skillbridge.userservice.dto.request.UpdateProfileRequest;
import com.skillbridge.userservice.dto.response.UserResponse;
import com.skillbridge.userservice.entity.User;
import com.skillbridge.userservice.exception.ResourceNotFoundException;
import com.skillbridge.userservice.repository.UserRepository;
import com.skillbridge.userservice.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::mapToUserResponse)
                .toList();
    }

    @Override
    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "User not found with id: " + id
                ));

        return mapToUserResponse(user);
    }

    @Override
    public UserResponse getUserProfileSummary(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "User not found with id: " + id
                ));

        if (Boolean.FALSE.equals(user.getActive())) {
            throw new RuntimeException("User account is deactivated");
        }

        return mapToUserResponse(user);
    }

    @Override
    public UserResponse getMyProfile() {
        User currentUser = getCurrentAuthenticatedUser();
        return mapToUserResponse(currentUser);
    }

    @Override
    public UserResponse updateMyProfile(UpdateProfileRequest request) {
        User currentUser = getCurrentAuthenticatedUser();

        currentUser.setFullName(request.getFullName());
        currentUser.setUniversity(request.getUniversity());
        currentUser.setGithubUrl(request.getGithubUrl());
        currentUser.setLinkedinUrl(request.getLinkedinUrl());

        User updatedUser = userRepository.save(currentUser);

        return mapToUserResponse(updatedUser);
    }

    @Override
    public void deleteMyAccount() {
        User currentUser = getCurrentAuthenticatedUser();

        // Soft delete / deactivate account
        currentUser.setActive(false);

        userRepository.save(currentUser);
    }

    private User getCurrentAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();

        if (authentication == null || authentication.getPrincipal() == null) {
            throw new RuntimeException("User is not authenticated");
        }

        Object principal = authentication.getPrincipal();

        if (principal instanceof User user) {
            return userRepository.findById(user.getId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Authenticated user not found"
                    ));
        }

        throw new RuntimeException("Invalid authenticated user");
    }

    private UserResponse mapToUserResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .university(user.getUniversity())
                .githubUrl(user.getGithubUrl())
                .linkedinUrl(user.getLinkedinUrl())
                .role(user.getRole())
                .active(user.getActive())
                .build();
    }
}