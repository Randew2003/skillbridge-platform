package com.skillbridge.userservice.service.impl;

import com.skillbridge.userservice.dto.response.UserResponse;
import com.skillbridge.userservice.entity.User;
import com.skillbridge.userservice.exception.ResourceNotFoundException;
import com.skillbridge.userservice.mapper.UserMapper;
import com.skillbridge.userservice.repository.UserRepository;
import com.skillbridge.userservice.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        return UserMapper.toUserResponse(user);
    }

    @Override
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(UserMapper::toUserResponse)
                .toList();
    }

    @Override
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User not found with id: " + id);
        }

        userRepository.deleteById(id);
    }
}