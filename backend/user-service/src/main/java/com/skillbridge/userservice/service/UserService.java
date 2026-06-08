package com.skillbridge.userservice.service;

import com.skillbridge.userservice.dto.request.UpdateProfileRequest;
import com.skillbridge.userservice.dto.response.UserResponse;

import java.util.List;

public interface UserService {

    List<UserResponse> getAllUsers();

    UserResponse getUserById(Long id);

    UserResponse getMyProfile();

    UserResponse updateMyProfile(UpdateProfileRequest request);

    void deleteMyAccount();
}