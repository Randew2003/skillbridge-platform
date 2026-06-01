package com.skillbridge.userservice.service;

import com.skillbridge.userservice.dto.request.LoginRequest;
import com.skillbridge.userservice.dto.request.RegisterRequest;
import com.skillbridge.userservice.dto.response.AuthResponse;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);
}